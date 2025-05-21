import QueryBuilder from '../../builder/queryBuilder';
import { ensureExists } from '../../utils/isExist';
import { TMessage } from './message.interface';
import Message from './message.model';

const createMessage = async (payload: TMessage) => {
  const message = await Message.create(payload);
  return message;
};

const getMessageById = async (id: string) => {
  const message = await Message.findById(id);
  ensureExists(message, "Message not found!");
  return message;
};

const getAllMessages = async (query: Record<string, unknown>) => {
  const messageQuery = Message.find();

  const queryBuilder = new QueryBuilder<TMessage>(messageQuery, query)
    .search(['name', 'email', 'subject', 'message'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const messages = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    data: messages,
  };
};

const updateMessage = async (id: string, payload: Partial<Pick<TMessage, 'viewed'>>) => {
  return await Message.findByIdAndUpdate(id, payload, { new: true });
};

const deleteMessage = async (id: string) => {
  const message = await Message.findByIdAndDelete(id);
  ensureExists(message, "Message not found!");
  return message;
};

export const MessageService = {
  createMessage,
  getMessageById,
  getAllMessages,
  updateMessage,
  deleteMessage,
};
