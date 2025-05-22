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
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const StatusFullError_1 = require("../../error/StatusFullError");
const emailSender_1 = __importDefault(require("../../utils/emailSender"));
const isExist_1 = require("../../utils/isExist");
const jwtHelper_1 = require("../../utils/jwtHelper");
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const userData = yield user_model_1.User.validateUser(payload.email);
    // Check if the password matches
    const isPasswordMatch = yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, userData === null || userData === void 0 ? void 0 : userData.password);
    if (!isPasswordMatch) {
        throw new Error("Password Incorrect");
    }
    //create token and send to the client
    const accessToken = jwtHelper_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        name: userData.name,
        image: userData.image,
    }, config_1.default.jwt.accessSecret, config_1.default.jwt.accessExpiresIn);
    const refreshToken = jwtHelper_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        name: userData.name,
        image: userData.image,
    }, config_1.default.jwt.refreshSecret, config_1.default.jwt.refreshExpiresIn);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // * Verify and decode token
    let decodedData;
    try {
        decodedData = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refreshSecret);
    }
    catch (error) {
        throw new Error("You are not authorized");
    }
    // * Validate and extract user from DB.
    const user = yield user_model_1.User.validateUser(decodedData.email);
    const accessToken = jwtHelper_1.jwtHelpers.generateToken({
        email: user.email,
        role: user.role,
        name: user.name,
        image: user.image,
    }, config_1.default.jwt.accessSecret, config_1.default.jwt.accessExpiresIn);
    return {
        accessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.User.findOne({
        email: user === null || user === void 0 ? void 0 : user.email,
        status: "ACTIVE",
    });
    (0, isExist_1.ensureExists)(userData, "User not found!");
    const isPasswordCorrect = yield bcrypt_1.default.compare(payload.oldPassword, userData.password);
    if (!isPasswordCorrect) {
        throw new Error("Password Incorrect");
    }
    const hashPass = yield bcrypt_1.default.hash(payload.newPassword, 12);
    yield user_model_1.User.findOneAndUpdate({ email: userData === null || userData === void 0 ? void 0 : userData.email }, { password: hashPass });
    return {
        message: "Password changed successfully",
    };
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.User.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        status: "ACTIVE",
    });
    (0, isExist_1.ensureExists)(userData, "User not found!");
    const resetPassToken = jwtHelper_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        name: userData.name,
        image: userData.image
    }, config_1.default.password.resetToken, config_1.default.password.resetExpiresIn);
    console.log({ resetPassToken });
    const resetPassLink = config_1.default.password.resetLink + `?userId=${userData.id}&token=${resetPassToken}`;
    yield (0, emailSender_1.default)(userData.email, `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa;">
    <h2 style="color: #333;">Password Reset Request</h2>
    <p>Hello <strong>${userData.email}</strong>,</p>
    <p>We received a request to reset your password. Click the button below to reset it:</p>
    <a href="${resetPassLink}" style="
      display: inline-block;
      padding: 10px 20px;
      margin-top: 10px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    ">Reset Password</a>
    <p style="margin-top: 20px;">If you didn't request this, you can ignore this email.</p>
    <p>Thanks,<br/>Your Support Team</p>
  </div>
    `);
    console.log(resetPassLink);
    // http://localhost:5000/reset-pass?
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by email and status active
    const userData = yield user_model_1.User.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.id,
        status: "ACTIVE",
    });
    (0, isExist_1.ensureExists)(userData, "User not found!");
    // Verify token (assuming verifyToken returns payload or throws on invalid)
    const isValidToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.password.resetToken);
    if (!isValidToken) {
        throw new StatusFullError_1.StatusFullError(false, 'FORBIDDEN', 403, 'You are forbidden to access');
    }
    // Hash new password
    const hashPass = yield bcrypt_1.default.hash(payload.password, 12);
    // Update user's password by _id (Note: findByIdAndUpdate takes id as first param)
    yield user_model_1.User.findByIdAndUpdate(userData._id, { password: hashPass });
    return { message: "Password reset successfully" };
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
};
