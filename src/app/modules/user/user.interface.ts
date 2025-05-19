import { Model } from 'mongoose';
import { UserRole, UserStatus } from './user.constant';


export type TUser = {
  _id: string
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  name: string;
  image?: string;
  contactNumber?: string;
};

export interface UserStatics extends Model<TUser> {
  validateUser(email?: string): Promise<TUser>;
  //instance methods for checking if the user exist
  isUserExists(email: string, id?: string): Promise<TUser | null>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

