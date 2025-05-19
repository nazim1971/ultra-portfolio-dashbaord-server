import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../app/config";
import { TErrorSources } from "../app/interface/error";
import handleZodError from "../app/error/handleZodError";
import handleValidationError from "../app/error/handleValidationError";
import handleCastError from "../app/error/handleCastError";
import handleDuplicateError from "../app/error/handleDuplicateError";
import { StatusFullError } from "../app/error/StatusFullError";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
):void => {
  //setting default values
  let statusCode = 500;
  let message = err.message || "something is wrong";

  let error: TErrorSources = [
    {
      path: "",
      message: "something is wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err instanceof StatusFullError) {
    statusCode = err?.status;
    message = err?.message;
    error = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    error = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

   res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.nodeEnv === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
