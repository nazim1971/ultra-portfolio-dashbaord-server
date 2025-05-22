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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_constant_1 = require("./user.constant");
const StatusFullError_1 = require("../../error/StatusFullError");
const httpStatus_1 = require("../../interface/httpStatus");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "USER",
        required: true,
    },
    status: {
        type: String,
        enum: Object.keys(user_constant_1.USER_STATUS),
        default: "ACTIVE",
    },
    name: { type: String, required: true },
    image: { type: String, default: null },
    contactNumber: { type: String, default: null },
}, {
    timestamps: true,
    versionKey: false,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // doc
        // hashing password and save into DB
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.salt));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
userSchema.statics.validateUser = function (email_1) {
    return __awaiter(this, arguments, void 0, function* (email, path = "") {
        if (!email) {
            throw new StatusFullError_1.StatusFullError(false, "BAD_REQUEST", httpStatus_1.httpStatus.BAD_REQUEST, "Please provide a valid email!", path);
        }
        const user = yield exports.User.findOne({ email }).select("+password");
        if (!user) {
            throw new StatusFullError_1.StatusFullError(false, "NOT_FOUND", httpStatus_1.httpStatus.NOT_FOUND, `No user found with email: ${email}!`, path);
        }
        if (user.status === "BLOCKED") {
            throw new StatusFullError_1.StatusFullError(false, "FORBIDDEN", httpStatus_1.httpStatus.FORBIDDEN, `User with email ${email} is blocked!`, path);
        }
        return user;
    });
};
userSchema.statics.isUserExists = function (identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if the identifier is an email
        if (identifier.includes("@")) {
            return yield exports.User.findOne({ email: identifier }).select("+password");
        }
        else {
            return yield exports.User.findById(identifier).select("+password");
        }
    });
};
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
exports.User = (0, mongoose_1.model)("user", userSchema);
