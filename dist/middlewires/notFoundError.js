"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundError = void 0;
const httpStatus_1 = require("../app/interface/httpStatus");
const notFoundError = (req, res, next) => {
    res.status(httpStatus_1.httpStatus.NOT_FOUND).json({
        success: false,
        message: "Api not found",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found",
        },
    });
};
exports.notFoundError = notFoundError;
