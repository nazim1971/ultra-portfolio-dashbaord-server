export type TMessageInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type TMessage = TMessageInput & {
  _id: string;
  viewed: boolean;
  createdAt: string; // or `Date` depending on usage
};
