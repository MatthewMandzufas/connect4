import { MatcherResult } from "@/vitest";

function checkIsPlainObjectOrArray(value) {
  return (
    (value !== null &&
      typeof value === "object" &&
      Object.getPrototypeOf(value) === Object.prototype) ||
    Array.isArray(value)
  );
}

function checkIfDeepUnequal(value1, value2) {
  if (
    (checkIsPlainObjectOrArray(value1) && !checkIsPlainObjectOrArray(value2)) ||
    (!checkIsPlainObjectOrArray(value1) && checkIsPlainObjectOrArray(value2)) ||
    (!checkIsPlainObjectOrArray(value1) && !checkIsPlainObjectOrArray(value2))
  ) {
    return true;
  }

  const objectKeys1 = Object.keys(value1);

  for (const key of objectKeys1) {
    const objectValue1 = value1[key];
    const objectValue2 = value2[key];

    if (!checkIfDeepUnequal(objectValue1, objectValue2)) {
      return false;
    }
  }
  return value1 !== value2;
}

function toBeDeeplyUnequal(
  this: { isNot: boolean } | void,
  received: object,
  expected: object
): MatcherResult {
  const { isNot } = this ?? {};
  const areObjectsDifferent = checkIfDeepUnequal(received, expected);
  return {
    pass: areObjectsDifferent,
    message: () => `Objects are deeply ${isNot ? "un" : ""}equal`,
  };
}

export default toBeDeeplyUnequal;
