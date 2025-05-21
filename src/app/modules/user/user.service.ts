import QueryBuilder from "../../builder/queryBuilder";
import config from "../../config";
import { StatusFullError } from "../../error/StatusFullError";
import { CustomPayload } from "../../interface";
import { httpStatus } from "../../interface/httpStatus";
import { ensureExists } from "../../utils/isExist";
import { jwtHelpers } from "../../utils/jwtHelper";
import { UserRole, UserStatus } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
  const user = await User.isUserExists(payload?.email);
  if (user) {
    throw new StatusFullError(
      false,
      "CONFLICT",
      httpStatus.CONFLICT,
      "User Already Exist"
    );
  }
  const data = await User.create(payload);
  const { _id, name, email } = data;
  const result = { _id, name, email };
  return result;
};

const getMyProfile = async (payload: CustomPayload) => {
  const userData = await User.findOne({
    email: payload?.email,
    status: "ACTIVE",
  }).select("_id email role status image");

  ensureExists(userData, "User not found!");

  return userData;
};

const updateProfile = async (
  id: string,
  payload: {name: string, image: string}
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await User.findOneAndUpdate(
    { _id: id, status: 'ACTIVE' }, // assuming `status: 'ACTIVE'` is equivalent to `isActive: true`
    payload,
    { new: true }
  );
   ensureExists(user, "User not found!");
 

  const accessToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
      image: user.image,
      name: user.name,
    },
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
      image: user.image,
      name: user.name,
    },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = User.find();

  const queryBuilder = new QueryBuilder<TUser>(userQuery, query)
    .search(["name", "email"]) // searchable fields
    .filter()
    .sort()
    .paginate()
    .fields();

  const users = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    data: users,
  };
};

const getSingleUser = async (id: string): Promise<TUser | null> => {
  const result = await User.findOne({ _id: id, status: "ACTIVE" });

  return result;
};

const updateStatus = async (
  userId: string,
  payload: { status: UserStatus; role: UserRole }
) => {
  // Find user by ID
  const userData = await User.findById(userId);

 ensureExists(userData, "User not found!");

  // Update user status and role, return the updated document
  const result = await User.findByIdAndUpdate(
    userId,
    payload,
    { new: true } // Return the updated document
  );

  return result;
};


export const UserService = {
  createUser,
  getMyProfile,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateStatus
};
