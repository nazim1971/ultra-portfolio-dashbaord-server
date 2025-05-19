import { Router } from 'express';
import { SkillController } from './skill.controller';
import validateRequest from '../../../middlewires/validateRequest';
import auth from '../../../middlewires/auth';
import { USER_ROLE } from '../user/user.constant';
import { SkillValidation } from './skill.validation';

export const SkillRoute = Router();

SkillRoute.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(SkillValidation.createSkill),
  SkillController.createSkill
);

SkillRoute.get('/', SkillController.getAllSkills);
SkillRoute.get('/:id', SkillController.getSingleSkill);

SkillRoute.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(SkillValidation.updateSkill),
  SkillController.updateSkill
);

SkillRoute.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.USER), SkillController.deleteSkill);
