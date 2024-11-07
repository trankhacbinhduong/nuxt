export const omit = <T extends Record<string, unknown>, K extends keyof T>(object: T, key: K) => {
  const { [key]: _, ...rest } = object
  return rest
}
