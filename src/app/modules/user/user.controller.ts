import { httpStatus } from "../../interface/httpStatus";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { sendImageToCloudinary } from "../../utils/fileUploader";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);
  const { _id, name, email } = result;

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: {
      _id,
      name,
      email,
    },
  });
});

//Get my profile
const getMyProfile = catchAsync(async (req, res) => {
  const result = await UserService.getMyProfile(req.user);
    console.log(result);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile fetched Successfully',
    data: result,
  });
});

//Update profile
const updateProfile = catchAsync(async (req, res) => {
  const payload = req.body;

  // Fetch current user profile
  const existingUser = await UserService.getMyProfile(req?.user);
  console.log(existingUser, 'reee');
  console.log(req?.user);
  if (req?.file) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
    const imageName = `${uniqueSuffix}-${req.user?.email.split('@')[0]}`;
    const path = req.file?.buffer;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.image = secure_url;
  } else {
    // Reuse existing image if no new image uploaded
    payload.image = existingUser?.image;
  }

  const { accessToken, refreshToken } = await UserService.updateProfile(
    existingUser?._id,
    payload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// getAllUsers
const getAllUsers = catchAsync(async (req, res) => {

  const result = await UserService.getAllUsers(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All users fetched successfully!",
    data: result.data,
    meta: result.meta,
  });
});

// Get single user
const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserService.getSingleUser(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User fetched Successfully',
    data: result,
  });
});

// updateUserActiveStatus
const updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log({id});
  const result = await UserService.updateStatus(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "message: 'Users updated Successfully'!",
    data: result,
  });
});

export const UserController = {
    createUser,
    getMyProfile,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateStatus
}