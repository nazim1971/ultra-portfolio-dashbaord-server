import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { httpStatus } from '../../interface/httpStatus';
import { MessageService } from './message.service';

const createMessage = catchAsync(async (req, res) => {
  const result = await MessageService.createMessage(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Message submitted successfully',
    data: result,
  });
});

const getAllMessages = catchAsync(async (req, res) => {
  const result = await MessageService.getAllMessages(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All messages retrieved successfully',
    data: result,
  });
});

const getSingleMessage = catchAsync(async (req, res) => {
  const result = await MessageService.getMessageById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Message retrieved successfully',
    data: result,
  });
});

const updateMessage = catchAsync(async (req, res) => {
  const result = await MessageService.updateMessage(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Message updated successfully',
    data: result,
  });
});

const deleteMessage = catchAsync(async (req, res) => {
  const result = await MessageService.deleteMessage(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Message deleted successfully',
    data: [],
  });
});

export const MessageController = {
  createMessage,
  getAllMessages,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
