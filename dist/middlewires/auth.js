"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = require("../app/shared/catchAsync");
const user_model_1 = require("../app/modules/user/user.model");
const StatusFullError_1 = require("../app/error/StatusFullError");
const jwtHelper_1 = require("../app/utils/jwtHelper");
const config_1 = __importDefault(require("../app/config"));
const httpStatus_1 = require("../app/interface/httpStatus");
const auth = (...roles) => {
    return (0, catchAsync_1.catchAsync)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // checking if the token is missing
        if (!token) {
            throw new StatusFullError_1.StatusFullError(false, "UNAUTHORIZED", httpStatus_1.httpStatus.UNAUTHORIZED, "You are not authorized!", req.originalUrl);
        }
        // checking if the given token is valid
        const decoded = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.accessSecret);
        req.user = decoded;
        const { email, role, iat } = decoded;
        yield user_model_1.User.validateUser(email);
        if (roles && !roles.includes(role)) {
            throw new StatusFullError_1.StatusFullError(false, "UNAUTHORIZED", httpStatus_1.httpStatus.UNAUTHORIZED, "You are not authorized!");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
