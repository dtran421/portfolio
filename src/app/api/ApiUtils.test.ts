import { describe, expect, test } from "vitest";

import { consumeAPIResponse } from "./ApiUtils";

describe("consumeAPIResponse", () => {
  test("it returns an error if the response has an error", () => {
    const errorResponse = {
      error: "test",
    };

    const result = consumeAPIResponse(errorResponse);

    expect(result.unwrap()).toEqual(new Error("test"));
  });

  test("it returns the data if the response has no error", () => {
    const dataResponse = {
      data: "test",
    };

    const result = consumeAPIResponse(dataResponse);

    expect(result.ok()).toEqual("test");
  });
});
