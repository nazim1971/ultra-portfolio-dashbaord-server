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
exports.ProjectService = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const isExist_1 = require("../../utils/isExist");
const project_model_1 = __importDefault(require("./project.model"));
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.create(payload);
    return project;
});
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.findById(id);
    (0, isExist_1.ensureExists)(project, "Project not found!");
    return project;
});
const getAllProjects = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const projectQuery = project_model_1.default.find(); // base query
    const queryBuilder = new queryBuilder_1.default(projectQuery, query)
        .search(['title', 'description']) // Add searchable fields
        .filter()
        .sort()
        .paginate()
        .fields();
    const projects = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    return {
        meta,
        data: projects,
    };
});
const updateProject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.default.findByIdAndUpdate(id, payload, { new: true });
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.findByIdAndDelete(id);
    (0, isExist_1.ensureExists)(project, "Project not found!");
    return project_model_1.default;
});
exports.ProjectService = {
    createProject,
    getProjectById,
    getAllProjects,
    updateProject,
    deleteProject,
};
