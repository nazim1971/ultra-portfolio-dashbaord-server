import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { httpStatus } from '../../interface/httpStatus';
import { SkillService } from './skill.service';

const createSkill = catchAsync(async (req, res) => {
  const result = await SkillService.createSkill(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Skill created successfully',
    data: result,
  });
});

const getAllSkills = catchAsync(async (_req, res) => {
  const result = await SkillService.getAllSkills();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skills retrieved successfully',
    data: result,
  });
});

const getSingleSkill = catchAsync(async (req, res) => {
  const result = await SkillService.getSingleSkill(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill retrieved successfully',
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const result = await SkillService.updateSkill(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill updated successfully',
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const result = await SkillService.deleteSkill(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill deleted successfully',
    data: result,
  });
});

export const SkillController = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
