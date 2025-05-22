"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../../middlewires/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../../middlewires/auth"));
const user_constant_1 = require("./user.constant");
const photoUploader_1 = require("../../utils/photoUploader");
exports.UserRoute = (0, express_1.Router)();
//Create User
exports.UserRoute.post('/create-user', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUser), user_controller_1.UserController.createUser);
//Get My Profile
exports.UserRoute.get("/me", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), user_controller_1.UserController.getMyProfile);
//update Profile
exports.UserRoute.patch("/profile", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), ...(0, photoUploader_1.parseSingleImageWithData)(), user_controller_1.UserController.updateProfile);
//Get All Users
exports.UserRoute.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), user_controller_1.UserController.getAllUsers);
//Get Single User
exports.UserRoute.get("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), user_controller_1.UserController.getSingleUser);
//Update User Status
exports.UserRoute.patch("/:id/status", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), user_controller_1.UserController.updateStatus);
