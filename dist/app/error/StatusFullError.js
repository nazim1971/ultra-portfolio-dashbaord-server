"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusFullError = void 0;
class StatusFullError extends Error {
    constructor(success, name, status, message, path = "") {
        super(message);
        this.success = success;
        this.name = name;
        this.status = status;
        this.message = message;
        this.path = path;
        this.success = success;
        this.name = name;
        this.status = status;
        this.path = path;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.StatusFullError = StatusFullError;
