import { Router } from 'express';
import { ProjectController } from './project.controller';
import auth from '../../../middlewires/auth';
import { USER_ROLE } from '../user/user.constant';
import { parseMultipleImagesWithData, parseSingleImageWithData } from '../../utils/photoUploader';
import validateRequest from '../../../middlewires/validateRequest';
import { ProjectValidation } from './project.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ...parseMultipleImagesWithData(),
  validateRequest(ProjectValidation.createProject),
  ProjectController.createProject
);

router.get('/:id', ProjectController.getProjectById);
router.get('/', ProjectController.getAllProjects);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ...parseMultipleImagesWithData(),
  validateRequest(ProjectValidation.updateProject),
  ProjectController.updateProject
);

router.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.USER), ProjectController.deleteProject);

export const ProjectRoute = router;
