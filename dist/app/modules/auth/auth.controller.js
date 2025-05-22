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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const httpStatus_1 = require("../../interface/httpStatus");
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const auth_service_1 = require("./auth.service");
//Login User
const loginUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, accessToken } = yield auth_service_1.AuthService.loginUser(req.body);
    res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.httpStatus.OK,
        success: true,
        message: "Successfully login",
        data: {
            accessToken,
            refreshToken,
        },
    });
}));
//Refresh Token
const refreshToken = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthService.refreshToken(refreshToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.httpStatus.OK,
        success: true,
        message: "Access Token generated Successfully",
        data: result,
    });
}));
//Change password
const changePassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log("req", req?.user);
    console.log({ user });
    const result = yield auth_service_1.AuthService.changePassword(user, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.httpStatus.OK,
        success: true,
        message: "Password changed Successfully ",
        data: result,
    });
}));
//forgot password
const forgotPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log("req", req === null || req === void 0 ? void 0 : req.user);
    const result = yield auth_service_1.AuthService.forgotPassword(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.httpStatus.OK,
        success: true,
        message: "Please Check your email!"
    });
}));
//reset password
const resetPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization || "";
    console.log("req.body", req.body);
    const result = yield auth_service_1.AuthService.resetPassword(token, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.httpStatus.OK,
        success: true,
        message: "Password reset successfully",
        data: result
    });
}));
exports.AuthController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
};
