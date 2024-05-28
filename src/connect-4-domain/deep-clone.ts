/* eslint-disable @typescript-eslint/no-explicit-any */

function deepClone<T>(
  value: T,
  visited: WeakMap<any, any> = new WeakMap<any, any>()
): T {
  if (!(value instanceof Object) || typeof value === "function") {
    return value;
  } else if (visited.has(value)) {
    return visited.get(value);
  }

  const result: T = Array.isArray(value) ? ([] as T) : ({} as T);

  visited.set(value, result);

  for (const key of Object.keys(value)) {
    result[key] = deepClone((value as { [key: string]: any })[key], visited);
  }

  return result;
}

export default deepClone;
