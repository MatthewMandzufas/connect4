interface CustomMatchers<R = unknown> {
  toBeUUID: () => R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

export type MatcherResult = {
  pass: boolean;
  message: () => string;
  actual?: unknown;
  expected?: unknown;
};
