import { MatcherResult } from "@/vitest";

function checkIsPlainObjectOrArray(value) {
  return (
    (value !== null &&
      typeof value === "object" &&
      Object.getPrototypeOf(value) === Object.prototype) ||
    Array.isArray(value)
  );
}

function checkIfDeepUnequal(object1, object2) {
  if (
    (checkIsPlainObjectOrArray(object1) &&
      !checkIsPlainObjectOrArray(object2)) ||
    (!checkIsPlainObjectOrArray(object1) && checkIsPlainObjectOrArray(object2))
  ) {
    return true;
  }

  if (object1 === object2) return false;

  const objectKeys1 = Object.keys(object1);
  const objectKeys2 = Object.keys(object2);

  if (objectKeys1.length !== objectKeys2.length) return true;

  for (const key of objectKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const areValuesObjects =
      checkIsPlainObjectOrArray(value1) && checkIsPlainObjectOrArray(value2);

    if (!areValuesObjects) return value1 === value2;
    if (areValuesObjects && !checkIfDeepUnequal(value1, value2)) return false;
  }
  return object1 !== object2;
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
