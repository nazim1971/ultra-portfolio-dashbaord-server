import { catchAsync } from '../../shared/catchAsync';
import { Request, Response } from 'express';
import { ProjectService } from './project.service';
import { sendResponse } from '../../shared/sendResponse';
import { httpStatus } from '../../interface/httpStatus';
import { sendImageToCloudinary } from '../../utils/fileUploader';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  if (req?.file) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
    const imageName = `${uniqueSuffix}-${req.user?.email?.split('@')[0]}`;
    const path = req.file?.buffer;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.image = secure_url;
  }

  const result = await ProjectService.createProject(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Project created successfully',
    data: result,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const result = await ProjectService.getProjectById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project retrieved successfully',
    data: result,
  });
});

const getAllProjects = catchAsync(async (_req, res) => {
  const result = await ProjectService.getAllProjects();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All projects retrieved successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const payload = req.body;
  const existing = await ProjectService.getProjectById(req.params.id);

  if (req?.file) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
    const imageName = `${uniqueSuffix}-${req.user?.email?.split('@')[0]}`;
    const path = req.file?.buffer;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.image = secure_url;
  } else {
    payload.image = existing?.image;
  }

  const result = await ProjectService.updateProject(req.params.id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project updated successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const result = await ProjectService.deleteProject(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project deleted successfully',
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject,
};
