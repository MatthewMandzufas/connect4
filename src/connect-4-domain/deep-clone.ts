/* eslint-disable @typescript-eslint/no-explicit-any */

function deepClone<T>(value: T): T {
  if (!(value instanceof Object)) {
    return value;
  }

  let result: any;

  if (Array.isArray(value)) {
    result = [] as any;
  } else {
    result = {} as any;
  }

  for (const key of Object.keys(value)) {
    result[key] = deepClone((value as { [key: string]: any })[key]);
  }

  return result;
}

export default deepClone;
