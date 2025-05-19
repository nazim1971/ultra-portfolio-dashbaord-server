import { TStatusCode } from "../interface/error";
import { TErrorName } from "../interface/error";

export class StatusFullError extends Error {
  constructor(
    public success: boolean,
    public name: TErrorName,
    public status: TStatusCode,
    public message: string,
    public path: string = ""
  ) {
    super(message);
    this.success = success;
    this.name = name;
    this.status = status;
    this.path = path;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
