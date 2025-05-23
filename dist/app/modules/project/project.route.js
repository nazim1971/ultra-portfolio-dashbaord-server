"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoute = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const auth_1 = __importDefault(require("../../../middlewires/auth"));
const user_constant_1 = require("../user/user.constant");
const photoUploader_1 = require("../../utils/photoUploader");
const validateRequest_1 = __importDefault(require("../../../middlewires/validateRequest"));
const project_validation_1 = require("./project.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), ...(0, photoUploader_1.parseMultipleImagesWithData)(), (0, validateRequest_1.default)(project_validation_1.ProjectValidation.createProject), project_controller_1.ProjectController.createProject);
router.get('/:id', project_controller_1.ProjectController.getProjectById);
router.get('/', project_controller_1.ProjectController.getAllProjects);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), ...(0, photoUploader_1.parseMultipleImagesWithData)(), (0, validateRequest_1.default)(project_validation_1.ProjectValidation.updateProject), project_controller_1.ProjectController.updateProject);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), project_controller_1.ProjectController.deleteProject);
exports.ProjectRoute = router;
