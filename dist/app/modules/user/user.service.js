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
exports.UserService = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const config_1 = __importDefault(require("../../config"));
const StatusFullError_1 = require("../../error/StatusFullError");
const httpStatus_1 = require("../../interface/httpStatus");
const isExist_1 = require("../../utils/isExist");
const jwtHelper_1 = require("../../utils/jwtHelper");
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(payload === null || payload === void 0 ? void 0 : payload.email);
    if (user) {
        throw new StatusFullError_1.StatusFullError(false, "CONFLICT", httpStatus_1.httpStatus.CONFLICT, "User Already Exist");
    }
    const data = yield user_model_1.User.create(payload);
    const { _id, name, email } = data;
    const result = { _id, name, email };
    return result;
});
const getMyProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.User.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        status: "ACTIVE",
    }).select("_id email role status image");
    (0, isExist_1.ensureExists)(userData, "User not found!");
    return userData;
});
const updateProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ _id: id, status: 'ACTIVE' }, // assuming `status: 'ACTIVE'` is equivalent to `isActive: true`
    payload, { new: true });
    (0, isExist_1.ensureExists)(user, "User not found!");
    const accessToken = jwtHelper_1.jwtHelpers.generateToken({
        email: user.email,
        role: user.role,
        image: user.image,
        name: user.name,
    }, config_1.default.jwt.accessSecret, config_1.default.jwt.accessExpiresIn);
    const refreshToken = jwtHelper_1.jwtHelpers.generateToken({
        email: user.email,
        role: user.role,
        image: user.image,
        name: user.name,
    }, config_1.default.jwt.refreshSecret, config_1.default.jwt.refreshExpiresIn);
    return {
        accessToken,
        refreshToken,
    };
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = user_model_1.User.find();
    const queryBuilder = new queryBuilder_1.default(userQuery, query)
        .search(["name", "email"]) // searchable fields
        .filter()
        .sort()
        .paginate()
        .fields();
    const users = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    return {
        meta,
        data: users,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id, status: "ACTIVE" });
    return result;
});
const updateStatus = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by ID
    const userData = yield user_model_1.User.findById(userId);
    (0, isExist_1.ensureExists)(userData, "User not found!");
    // Update user status and role, return the updated document
    const result = yield user_model_1.User.findByIdAndUpdate(userId, payload, { new: true } // Return the updated document
    );
    return result;
});
exports.UserService = {
    createUser,
    getMyProfile,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateStatus
};
