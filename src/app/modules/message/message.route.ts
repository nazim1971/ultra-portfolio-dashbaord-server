import { Router } from 'express';
import { MessageController } from './message.controller';
import validateRequest from '../../../middlewires/validateRequest';
import auth from '../../../middlewires/auth';
import { USER_ROLE } from '../user/user.constant';
import { MessageValidation } from './message.validation';

export const MessageRoute = Router();

// Public route: anyone can send a message
MessageRoute.post(
  '/',
  validateRequest(MessageValidation.createMessage),
  MessageController.createMessage
);

// Only ADMIN or USER can view messages
MessageRoute.get('/', auth(USER_ROLE.ADMIN, USER_ROLE.USER), MessageController.getAllMessages);

MessageRoute.get('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.USER), MessageController.getSingleMessage);

// Only viewed field should be updated
MessageRoute.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  MessageController.updateMessage
);

// Only ADMIN or USER can delete a message
MessageRoute.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.USER), MessageController.deleteMessage);
