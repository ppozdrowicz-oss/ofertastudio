export const diagnosticDomainIds = [
  "shoper",
  "mobile",
  "product",
  "marketplace",
  "website",
  "ecosystem",
] as const;

export type DiagnosticDomainId = (typeof diagnosticDomainIds)[number];

export function getDiagnosticDomainIndex(domain: DiagnosticDomainId): number {
  return diagnosticDomainIds.indexOf(domain);
}
