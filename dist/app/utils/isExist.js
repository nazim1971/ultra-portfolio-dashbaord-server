"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureExists = ensureExists;
const StatusFullError_1 = require("../error/StatusFullError");
const httpStatus_1 = require("../interface/httpStatus");
function ensureExists(data, message = "Resource not found", statusCode = httpStatus_1.httpStatus.NOT_FOUND) {
    if (!data) {
        throw new StatusFullError_1.StatusFullError(false, 'NOT_FOUND', statusCode, message);
    }
}
