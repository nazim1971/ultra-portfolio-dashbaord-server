export type TErrorSources = {
    path: string | number;
    message: string;
  }[];
  
  export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    error: TErrorSources;
  };

  import mongoose from 'mongoose';
import { httpStatus } from './httpStatus';
  export interface StatusfullError extends Error {
    status?: number;
  }
  
  export interface MongoError {
    errorResponse: {
      index: number;
      code: number;
      errmsg: string;
      keyPattern: Record<string, number>;
      keyValue: Record<string, string>;
    };
    index: number;
    code: number;
    keyPattern: Record<string, number>;
    keyValue: Record<string, string>;
  }
  
  export interface ParserError {
    expose: boolean;
    statusCode: number;
    status: number;
    body: string;
    type: string;
  }
  export interface ValidationErrorResponse {
    success: boolean;
    message: string;
    error: {
      details: {
        name: string;
        errors: Record<string, mongoose.Error.ValidatorError>;
      };
    };
    stack?: string;
  }

//   export type TErrorName =
//   | 'ValidationError'
//   | 'ConflictError'
//   | 'NotFoundError'
//   | 'UnauthorizedError'
//   | 'ForbiddenError'
//   | 'InternalServerError';

// export type TStatusCode = 200 | 400 | 401 | 403 | 404 | 500;

export type TStatusCode = (typeof httpStatus)[keyof typeof httpStatus];

export type TErrorName = keyof typeof httpStatus;
