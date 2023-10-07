import { describe, expect, test } from "vitest";

import { Err, None, Ok, Option, Result, Some } from "./ReturnTypes";

describe("Result", () => {
  test("it identifies itself as ok or err", () => {
    const okResult = Result<string, Error>("test");

    expect(okResult.isOk()).toBe(true);
    expect(okResult.isErr()).toBe(false);

    const errResult = Result<string, Error>(new Error("test"));

    expect(errResult.isOk()).toBe(false);
    expect(errResult.isErr()).toBe(true);
  });

  test("it unwraps its value/error", () => {
    const okResult = Result<string, Error>("test");

    expect(okResult.unwrap()).toBe("test");
    expect(okResult.ok()).toBe("test");

    const errResult = Result<string, Error>(new Error("test"));

    expect(errResult.unwrap()).toBeInstanceOf(Error);
    expect((errResult.unwrap() as Error).message).toBe("test");
    expect(() => errResult.ok()).toThrowError("test");
  });

  test("it has a value/error property and throws an error when accessed directly", () => {
    const okResult = Result<string, Error>("test");

    expect("value" in okResult).toBe(true);
    expect(() => (okResult as Ok<string>).value).toThrowError("cannot access result directly, use `unwrap()` instead!");
    expect("error" in okResult).toBe(false);

    const errResult = Result<string, Error>(new Error("test"));

    expect("error" in errResult).toBe(true);
    expect(() => (errResult as Err<Error>).error).toThrowError(
      "cannot access result directly, use `unwrap()` instead!"
    );
    expect("value" in errResult).toBe(false);
  });
});

describe("Option", () => {
  test("it identifies itself as some or none", () => {
    const someOption = Option<string>("test");

    expect(someOption.isSome()).toBe(true);
    expect(someOption.isNone()).toBe(false);

    const noneOption = Option<string>(null);

    expect(noneOption.isSome()).toBe(false);
    expect(noneOption.isNone()).toBe(true);
  });

  test("it coalesces its value", () => {
    const someOption = Option<string>("test");

    expect(someOption.coalesce()).toBe("test");
    expect(someOption.coalesce("default")).toBe("test");

    const noneOption = Option<string>(null);

    expect(noneOption.coalesce()).toBe(null);
    expect(noneOption.coalesce("default")).toBe("default");

    const undefinedNoneOption = Option<string>(undefined);

    expect(undefinedNoneOption.coalesce()).toBe(null);
    expect(undefinedNoneOption.coalesce("default")).toBe("default");
  });

  test("it has a value property and throws an error when accessed directly", () => {
    const someOption = Option<string>("test");

    expect("value" in someOption).toBe(true);
    expect(() => (someOption as Some<string>).value).toThrowError(
      "cannot access option directly, use `coalesce()` instead!"
    );
    expect("error" in someOption).toBe(false);

    const noneOption = Option<string>(null);

    expect("value" in noneOption).toBe(true);
    expect(() => (noneOption as None<string>).value).toThrowError(
      "cannot access option directly, use `coalesce()` instead!"
    );
    expect("error" in noneOption).toBe(false);
  });
});
