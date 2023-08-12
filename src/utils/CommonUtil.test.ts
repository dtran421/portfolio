import { describe, expect, test } from "vitest";

import { isNullish } from "./CommonUtil";

describe("isNullish", () => {
  test("it returns true for null", () => {
    expect(isNullish(null)).toBe(true);
  });

  test("it returns true for undefined", () => {
    expect(isNullish(undefined)).toBe(true);
  });

  test("it returns false for 0", () => {
    expect(isNullish(0)).toBe(false);
  });

  test("it returns false for false", () => {
    expect(isNullish(false)).toBe(false);
  });

  test("it returns false for empty string", () => {
    expect(isNullish("")).toBe(false);
  });

  test("it returns false for empty array", () => {
    expect(isNullish([])).toBe(false);
  });

  test("it returns false for empty object", () => {
    expect(isNullish({})).toBe(false);
  });

  test("it returns false for NaN", () => {
    expect(isNullish(NaN)).toBe(false);
  });

  test("it returns false for Infinity", () => {
    expect(isNullish(Infinity)).toBe(false);
    expect(isNullish(-Infinity)).toBe(false);
  });

  test("it returns false for function", () => {
    expect(
      isNullish(() => {
        // do nothing
      })
    ).toBe(false);
  });

  test("it returns false for class", () => {
    class Test {}
    expect(isNullish(Test)).toBe(false);

    expect(isNullish(new Test())).toBe(false);
  });
});
