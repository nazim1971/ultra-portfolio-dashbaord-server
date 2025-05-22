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
exports.ProjectController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const project_service_1 = require("./project.service");
const sendResponse_1 = require("../../shared/sendResponse");
const httpStatus_1 = require("../../interface/httpStatus");
const fileUploader_1 = require("../../utils/fileUploader");
const createProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    payload.images = [];
    console.log("file", req === null || req === void 0 ? void 0 : req.file);
    if (req.files && Array.isArray(req.files)) {
        const imageUrls = yield Promise.all(req.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
            const imageName = `${uniqueSuffix}-${(_a = req.user) === null || _a === void 0 ? void 0 : _a.email.split("@")[0]}`;
            const path = file === null || file === void 0 ? void 0 : file.buffer;
            const { secure_url } = yield (0, fileUploader_1.sendImageToCloudinary)(imageName, path);
            return secure_url;
        })));
        payload.images = imageUrls;
    }
    const result = yield project_service_1.ProjectService.createProject(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.CREATED,
        message: 'Project created successfully',
        data: result,
    });
}));
const getProjectById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.ProjectService.getProjectById(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.OK,
        message: 'Project retrieved successfully',
        data: result,
    });
}));
const getAllProjects = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.ProjectService.getAllProjects(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.OK,
        message: 'All projects retrieved successfully',
        data: result,
    });
}));
const updateProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const existing = yield project_service_1.ProjectService.getProjectById(req.params.id);
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const imageUrls = yield Promise.all(req.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
            const imageName = `${uniqueSuffix}-${(_a = req.user) === null || _a === void 0 ? void 0 : _a.email.split('@')[0]}`;
            const path = file === null || file === void 0 ? void 0 : file.buffer;
            const { secure_url } = yield (0, fileUploader_1.sendImageToCloudinary)(imageName, path);
            return secure_url;
        })));
        payload.images = imageUrls;
    }
    else {
        payload.images = existing.images;
    }
    const result = yield project_service_1.ProjectService.updateProject(req.params.id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.OK,
        message: 'Project updated successfully',
        data: result,
    });
}));
const deleteProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.ProjectService.deleteProject(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.OK,
        message: 'Project deleted successfully',
        data: []
    });
}));
exports.ProjectController = {
    createProject,
    getProjectById,
    getAllProjects,
    updateProject,
    deleteProject,
};
