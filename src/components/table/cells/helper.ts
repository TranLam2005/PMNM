export function normalizeValue(value: unknown): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value ? "true" : "false";
  if (value instanceof Date) return value.toISOString();
  try {
    return JSON.stringify(value);
  } catch {
    return "Huhu";
  }
}

export type PathValue<ObjectType, Path extends string> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof ObjectType
    ? PathValue<ObjectType[Key], Rest>
    : never
  : Path extends keyof ObjectType
    ? ObjectType[Path]
    : never;

export function getNestedValue<T extends object, P extends string>(
  obj: T,
  path: P
): PathValue<T, P> {
  const parts = path.split(".") as Array<string>;
  let result: unknown = obj;
  for (const key of parts) {
    result = (result as Record<string, unknown>)[key];
  }
  return result as PathValue<T, P>;
}
