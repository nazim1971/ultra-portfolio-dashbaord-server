import { StatusFullError } from "../error/StatusFullError";
import { httpStatus } from "../interface/httpStatus";

export function ensureExists<T>(
  data: T | null | undefined,
  message = "Resource not found",
  statusCode = httpStatus.NOT_FOUND
): asserts data is T {
  if (!data) {
    throw new StatusFullError(false, 'NOT_FOUND', statusCode, message);
  }
}
