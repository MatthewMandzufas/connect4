/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Assertion, AsymmetricMatchersContaining } from "vitest";

interface CustomMatchers<R = unknown> {
  toBeUUID: () => R;
  toBeDeeplyUnequal: (value: object) => R;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

export type MatcherResult = {
  pass: boolean;
  message: () => string;
  actual?: unknown;
  expected?: unknown;
};
