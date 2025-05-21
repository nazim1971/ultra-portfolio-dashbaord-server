import config from "../../config";
import { StatusFullError } from "../../error/StatusFullError";
import { CustomPayload } from "../../interface";
import { httpStatus } from "../../interface/httpStatus";
import emailSender from "../../utils/emailSender";
import { ensureExists } from "../../utils/isExist";
import { jwtHelpers } from "../../utils/jwtHelper";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUser = async (payload: TLogin) => {
  // checking if the user is exist
  const userData = await User.validateUser(payload.email);

  // Check if the password matches
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.password,
    userData?.password
  );
  if (!isPasswordMatch) {
    throw new Error("Password Incorrect");
  }

  //create token and send to the client
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      name: userData.name,
      image: userData.image,
    },
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      name: userData.name,
      image: userData.image,
    },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (
  token: string
): Promise<{ accessToken: string }> => {
  // * Verify and decode token
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refreshSecret
    ) as CustomPayload;
  } catch (error) {
    throw new Error("You are not authorized");
  }

  // * Validate and extract user from DB.
  const user = await User.validateUser(decodedData.email);

  const accessToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
      name: user.name,
      image: user.image,
    },
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn
  );

  return {
    accessToken,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await User.findOne({
    email: user?.email,
    status: "ACTIVE",
  });

 ensureExists(userData, "User not found!");


  const isPasswordCorrect: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Password Incorrect");
  }
  const hashPass: string = await bcrypt.hash(payload.newPassword, 12);

  await User.findOneAndUpdate(
    { email: userData?.email },
    { password: hashPass }
  );

  return {
    message: "Password changed successfully",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await User.findOne({
    email: payload?.email,
    status: "ACTIVE",
  });
  ensureExists(userData, "User not found!");

  const resetPassToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      name: userData.name,
      image: userData.image
    },
    config.password.resetToken,
    config.password.resetExpiresIn
  );

  console.log({ resetPassToken });
  const resetPassLink =
    config.password.resetLink + `?userId=${userData.id}&token=${resetPassToken}`;

  await emailSender(
    userData.email,

    `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa;">
    <h2 style="color: #333;">Password Reset Request</h2>
    <p>Hello <strong>${userData.email}</strong>,</p>
    <p>We received a request to reset your password. Click the button below to reset it:</p>
    <a href="${resetPassLink}" style="
      display: inline-block;
      padding: 10px 20px;
      margin-top: 10px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    ">Reset Password</a>
    <p style="margin-top: 20px;">If you didn't request this, you can ignore this email.</p>
    <p>Thanks,<br/>Your Support Team</p>
  </div>
    `
  );
  console.log(resetPassLink);
  // http://localhost:5000/reset-pass?
};


const resetPassword = async (
  token: string,
  payload: {
    id: string;
    password: string;
  }
) => {
  // Find user by email and status active
  const userData = await User.findOne({
    email: payload?.id,
    status: "ACTIVE",
  });
  ensureExists(userData, "User not found!");

  // Verify token (assuming verifyToken returns payload or throws on invalid)
  const isValidToken = jwtHelpers.verifyToken(token, config.password.resetToken);
  if (!isValidToken) {
    throw new StatusFullError(
      false,
      'FORBIDDEN',
      403,
      'You are forbidden to access'
    );
  }

  // Hash new password
  const hashPass: string = await bcrypt.hash(payload.password, 12);

  // Update user's password by _id (Note: findByIdAndUpdate takes id as first param)
  await User.findByIdAndUpdate(userData._id, { password: hashPass });

  return { message: "Password reset successfully" };
};



export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
};
