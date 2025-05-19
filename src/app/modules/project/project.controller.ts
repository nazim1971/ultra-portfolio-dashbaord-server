import { catchAsync } from '../../shared/catchAsync';
import { Request, Response } from 'express';
import { ProjectService } from './project.service';
import { sendResponse } from '../../shared/sendResponse';
import { httpStatus } from '../../interface/httpStatus';
import { sendImageToCloudinary } from '../../utils/fileUploader';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.images = [];
    console.log("file", req?.file);
 if (req.files && Array.isArray(req.files)) {
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
        const imageName = `${uniqueSuffix}-${req.user?.email.split("@")[0]}`;
        const path = file?.buffer;

        const { secure_url } = await sendImageToCloudinary(imageName, path);
        return secure_url;
      })
    );
    payload.images = imageUrls;
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

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectService.getAllProjects(req.query);
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

   if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
          const imageName = `${uniqueSuffix}-${req.user?.email.split('@')[0]}`;
          const path = file?.buffer;

          const { secure_url } = await sendImageToCloudinary(imageName, path);
          return secure_url;
        })
      );
      payload.images = imageUrls;
    } else {
      payload.images = existing.images;
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
    data: []
  });
});

export const ProjectController = {
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject,
};
