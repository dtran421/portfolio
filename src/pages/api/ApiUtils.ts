import { Result } from "@/utils/ReturnTypes";
import { APIResponse } from "@/utils/types";

export const consumeAPIResponse = <T = unknown>(response: APIResponse<T>) => {
  if ("error" in response) {
    return Result<T, Error>(new Error(response.error));
  }

  return Result<T, Error>(response.data);
};
