import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const projectRoot = process.cwd();
const sourceRoot = join(projectRoot, "src");
const componentsRoot = join(sourceRoot, "components");
const globalsPath = join(sourceRoot, "styles", "globals.css");
const errors: string[] = [];
const approvedClientModules = new Set<string>();

const expectedComponentFiles = [
  "layout/container.tsx",
  "layout/section.tsx",
  "shared/cta-panel.tsx",
  "shared/feature-list.tsx",
  "shared/process-step.tsx",
  "shared/section-heading.tsx",
  "shared/service-card.tsx",
  "ui/badge.tsx",
  "ui/breadcrumb.tsx",
  "ui/button.tsx",
  "ui/card.tsx",
  "ui/divider.tsx",
  "ui/form.tsx",
  "ui/icon-box.tsx",
  "ui/notice.tsx",
  "ui/text-link.tsx",
] as const;

function check(condition: boolean, message: string): void {
  if (!condition) {
    errors.push(message);
  }
}

function collectSourceFiles(directory: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directory)) {
    const entryPath = join(directory, entry);
    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      files.push(...collectSourceFiles(entryPath));
      continue;
    }

    if ([".ts", ".tsx"].includes(extname(entryPath))) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

function resolveLocalImport(
  importer: string,
  specifier: string,
): string | null {
  let basePath: string;

  if (specifier.startsWith("@/")) {
    basePath = join(sourceRoot, specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    basePath = resolve(dirname(importer), specifier);
  } else {
    return null;
  }

  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    join(basePath, "index.ts"),
    join(basePath, "index.tsx"),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function buildImportGraph(
  files: readonly string[],
): Map<string, readonly string[]> {
  const fileSet = new Set(files);
  const graph = new Map<string, readonly string[]>();
  const importPattern = /(?:from\s+|import\s*)["']([^"']+)["']/g;

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const dependencies = new Set<string>();

    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1];

      if (!specifier) {
        continue;
      }

      const dependency = resolveLocalImport(file, specifier);

      if (dependency && fileSet.has(dependency)) {
        dependencies.add(dependency);
      }
    }

    graph.set(file, [...dependencies]);
  }

  return graph;
}

function findImportCycles(
  graph: ReadonlyMap<string, readonly string[]>,
): readonly string[][] {
  const state = new Map<string, "done" | "visiting">();
  const stack: string[] = [];
  const cycles: string[][] = [];

  function visit(file: string): void {
    const currentState = state.get(file);

    if (currentState === "done") {
      return;
    }

    if (currentState === "visiting") {
      const cycleStart = stack.indexOf(file);
      cycles.push([...stack.slice(cycleStart), file]);
      return;
    }

    state.set(file, "visiting");
    stack.push(file);

    for (const dependency of graph.get(file) ?? []) {
      visit(dependency);
    }

    stack.pop();
    state.set(file, "done");
  }

  for (const file of graph.keys()) {
    visit(file);
  }

  return cycles;
}

function parseCssVariables(source: string): ReadonlyMap<string, string> {
  const variables = new Map<string, string>();
  const variablePattern = /(--[a-z0-9-]+):\s*([^;]+);/gi;

  for (const match of source.matchAll(variablePattern)) {
    const name = match[1];
    const value = match[2]?.trim();

    if (name && value) {
      variables.set(name, value);
    }
  }

  return variables;
}

function resolveHexColor(
  name: string,
  variables: ReadonlyMap<string, string>,
  visited = new Set<string>(),
): string | null {
  if (visited.has(name)) {
    return null;
  }

  visited.add(name);
  const value = variables.get(name);

  if (!value) {
    return null;
  }

  if (/^#[0-9a-f]{6}$/i.test(value)) {
    return value;
  }

  const reference = value.match(/^var\((--[a-z0-9-]+)\)$/i)?.[1];
  return reference ? resolveHexColor(reference, variables, visited) : null;
}

function relativeLuminance(hex: string): number {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels || channels.length !== 3) {
    throw new Error(`Niepoprawny kolor: ${hex}`);
  }

  const linearChannels = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return (
    0.2126 * (linearChannels[0] ?? 0) +
    0.7152 * (linearChannels[1] ?? 0) +
    0.0722 * (linearChannels[2] ?? 0)
  );
}

function contrastRatio(first: string, second: string): number {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

const sourceFiles = collectSourceFiles(sourceRoot);

for (const expectedFile of expectedComponentFiles) {
  const filePath = join(componentsRoot, expectedFile);
  check(existsSync(filePath), `Brakuje komponentu: ${expectedFile}.`);

  if (existsSync(filePath)) {
    const source = readFileSync(filePath, "utf8");
    check(
      /export\s+(?:function|type|const)\s+/.test(source),
      `Moduł ${expectedFile} nie udostępnia jawnego eksportu.`,
    );
  }
}

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  const relativePath = relative(projectRoot, file);

  check(
    !/(?:\bas\s+any\b|:\s*any\b|<any>|\bany\[\]|Array<any>|@ts-ignore)/.test(
      source,
    ),
    `${relativePath}: wykryto niedozwolony typ any lub @ts-ignore.`,
  );

  if (source.trimStart().startsWith('"use client"')) {
    check(
      approvedClientModules.has(relativePath),
      `${relativePath}: Client Component wymaga jawnego dopisania do zatwierdzonej listy.`,
    );
  }

  if (file.endsWith(".tsx")) {
    check(
      !/\sstyle=\{/.test(source),
      `${relativePath}: wykryto styl inline zamiast tokenu lub klasy.`,
    );
    check(
      !/(?:\bw-screen\b|\boverflow-x-hidden\b|\bmin-w-\[(?:\d|\.)+(?:px|rem)\])/.test(
        source,
      ),
      `${relativePath}: wykryto klasę podwyższającą ryzyko poziomego overflow.`,
    );
  }

  if (file.startsWith(componentsRoot)) {
    check(
      !/#[0-9a-f]{3,8}\b/i.test(source),
      `${relativePath}: wykryto surowy kolor hex w komponencie.`,
    );
  }

  for (const match of source.matchAll(
    /import\s+([\s\S]*?)\s+from\s+["']lucide-react["'];/g,
  )) {
    const importClause = match[1] ?? "";
    check(
      !importClause.includes("* as"),
      `${relativePath}: ikony Lucide nie mogą być importowane jako namespace.`,
    );
  }
}

const importCycles = findImportCycles(buildImportGraph(sourceFiles));
for (const cycle of importCycles) {
  errors.push(
    `Cykliczny import: ${cycle
      .map((file) => relative(sourceRoot, file))
      .join(" -> ")}.`,
  );
}

const cssVariables = parseCssVariables(readFileSync(globalsPath, "utf8"));
const globalsSource = readFileSync(globalsPath, "utf8");

check(
  /min-width:\s*20rem/.test(globalsSource),
  "Globalny minimalny viewport nie odpowiada granicy 320 px.",
);
check(
  /--container-gutter:\s*clamp\(1rem,\s*4vw,\s*2\.5rem\)/.test(globalsSource),
  "Gutter kontenera nie ma zatwierdzonego zakresu responsywnego.",
);
const contrastPairs = [
  ["--foreground", "--background", 4.5, "tekst / tło"],
  ["--foreground", "--surface", 4.5, "tekst outline / surface"],
  ["--foreground", "--surface-muted", 4.5, "tekst / muted surface"],
  ["--muted-foreground", "--background", 4.5, "tekst muted / tło"],
  [
    "--muted-foreground",
    "--surface-muted",
    4.5,
    "badge neutral / muted surface",
  ],
  ["--primary-foreground", "--primary", 4.5, "tekst CTA / primary"],
  ["--primary", "--background", 4.5, "link / tło"],
  ["--secondary-foreground", "--secondary", 4.5, "tekst / secondary"],
  ["--accent-foreground", "--accent-surface", 4.5, "tekst / accent"],
  ["--accent-foreground", "--accent", 4.5, "tekst / accent strong"],
  ["--focus-ring", "--background", 3, "focus ring / tło"],
  ["--focus-ring", "--surface-inverse", 3, "focus ring / strong"],
  ["--border-control", "--surface", 3, "kontrolka / surface"],
  ["--success-foreground", "--success-surface", 4.5, "success"],
  ["--warning-foreground", "--warning-surface", 4.5, "warning"],
  ["--danger-foreground", "--danger-surface", 4.5, "error"],
  ["--info-foreground", "--info-surface", 4.5, "information"],
  ["--surface-inverse-foreground", "--surface-inverse", 4.5, "tekst / strong"],
  [
    "--surface-inverse-muted-foreground",
    "--surface-inverse",
    4.5,
    "tekst muted / strong",
  ],
] as const;

const contrastResults: string[] = [];

for (const [
  foregroundToken,
  backgroundToken,
  minimum,
  label,
] of contrastPairs) {
  const foreground = resolveHexColor(foregroundToken, cssVariables);
  const background = resolveHexColor(backgroundToken, cssVariables);

  check(
    Boolean(foreground && background),
    `Nie można rozwiązać kolorów dla pary ${label}.`,
  );

  if (foreground && background) {
    const ratio = contrastRatio(foreground, background);
    check(
      ratio >= minimum,
      `${label}: kontrast ${ratio.toFixed(2)}:1 jest niższy niż ${minimum}:1.`,
    );
    contrastResults.push(`${label}: ${ratio.toFixed(2)}:1`);
  }
}

if (errors.length > 0) {
  console.error(`Kontrola design systemu nie powiodła się (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log("Kontrola design systemu zakończona pomyślnie.");
  console.log(
    `Sprawdzono: ${expectedComponentFiles.length} modułów komponentów, ${sourceFiles.length} plików źródłowych i ${contrastPairs.length} par kontrastu.`,
  );
  for (const result of contrastResults) {
    console.log(`- ${result}`);
  }
}
