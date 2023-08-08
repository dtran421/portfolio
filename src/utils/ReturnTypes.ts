import { isNullish } from "./Common";

/** ********
 * RESULT  *
 ********* */

/* Components */
/**
 * Ok: The operation was successful, and the value inside contains the result of the operation.
 */
export type Ok<T> = { value: T; unwrap: () => T; ok: () => T; isOk: () => true; isErr: () => false };
/**
 * Err: The operation failed, and the value inside contains information about the failure.
 * This variant is generically typed with E to indicate it can contain different types of error values.
 *
 * `unwrap()` will return the error if it is called on an Err variant.
 *
 * `ok()` will throw the error if it is called on an Err variant.
 */
export type Err<E> = { error: E; unwrap: () => E; ok: () => never; isOk: () => false; isErr: () => true };

/* Main type */
export type Result<T, E> = Ok<T> | Err<E>;

/* Constructor */
export const Result = <T = unknown, E = Error>(p: T | E): Result<T, E> => {
  const ok = !(p instanceof Error);
  const o = { isOk: () => ok, isErr: () => !ok };

  Object.defineProperties(o, {
    [ok ? "value" : "error"]: {
      get() {
        throw new Error("cannot access result directly, use `unwrap()` instead!");
      },
    },
    unwrap: {
      value: () => p,
    },
    ok: {
      value: () => {
        if (ok) {
          return p;
        }

        throw p;
      },
    },
  });

  return o as Result<T, E>;
};

/** ********
 * OPTION  *
 * ******* */

/* Components */
/**
 * Some: The option contains a value.
 *
 * `coalesce()` will return the value if it is called on a Some variant, regardless of whether a default value is provided.
 */
export type Some<T> = {
  some: true;
  value: T;
  coalesce: (defaultValue?: T) => T;
  isNone: () => false;
  isSome: () => true;
};
/**
 * None: The option does not contain a value.
 */
export type None<T> = {
  some: false;
  value: null | undefined;
  coalesce: (defaultValue?: T) => T;
  isNone: () => true;
  isSome: () => false;
};

/* Main type */
export type Option<T> = Some<T> | None<T>;

/* Constructor */
export const Option = <T = unknown>(value?: T | null): Option<T> => {
  const some = !isNullish(value);
  const o = {};

  Object.defineProperties(o, {
    value: {
      get() {
        throw new Error("cannot access option directly, use `coalesce()` instead!");
      },
    },
    coalesce: {
      value: (defaultValue?: T) => (some ? value : defaultValue ?? null),
    },
    isNone: {
      value: () => !some,
    },
    isSome: {
      value: () => some,
    },
  });

  return o as Option<T>;
};
