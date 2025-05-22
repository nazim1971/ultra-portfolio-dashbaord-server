"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../../middlewires/auth"));
const user_constant_1 = require("../user/user.constant");
exports.AuthRoute = (0, express_1.Router)();
//Login User
exports.AuthRoute.post('/login', auth_controller_1.AuthController.loginUser);
//Refresh Token
exports.AuthRoute.post('/refresh-token', auth_controller_1.AuthController.refreshToken);
//Change Password
exports.AuthRoute.put('/change-password', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), auth_controller_1.AuthController.changePassword);
//Forget Password
exports.AuthRoute.post('/forgot-password', auth_controller_1.AuthController.forgotPassword);
//Reset Password
exports.AuthRoute.post('/reset-password', auth_controller_1.AuthController.resetPassword);
