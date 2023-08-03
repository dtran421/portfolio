type Ok<T> = { ok: true; value: T };
type Err<E> = { ok: false; error: E };

export type Result<T, E> = Ok<T> | Err<E>;
export type Option<T> = T | null | undefined;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E>(error: E): Err<E> => ({ ok: false, error });

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => result.ok;
export const isErr = <T, E>(result: Result<T, E>): result is Err<E> => !result.ok;

export const unwrap = <T, E>(result: Result<T, E>): T => {
  if (result.ok) {
    return result.value;
  }

  throw new Error(`called unwrap on an error: ${(result as Err<E>).error}`);
};
