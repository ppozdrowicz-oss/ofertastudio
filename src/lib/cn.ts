type ClassName = false | null | string | undefined;

export function cn(...classNames: ClassName[]): string {
  return classNames
    .filter((className): className is string => Boolean(className))
    .join(" ");
}
