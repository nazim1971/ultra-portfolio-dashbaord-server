import { httpStatus } from "../../interface/httpStatus";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { AuthService } from "./auth.service";

//Login User
const loginUser = catchAsync(async (req, res) => {
  const { refreshToken, accessToken } = await AuthService.loginUser(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully login",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

//Refresh Token
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access Token generated Successfully",
    data: result,
  });
});

//Change password
const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  // console.log("req", req?.user);
  console.log({user});
  const result = await AuthService.changePassword(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed Successfully ",
    data: result,
  });
});

//forgot password
const forgotPassword = catchAsync(async (req, res) =>{
    const user = req.user
    console.log("req",req?.user);
    const result = await AuthService.forgotPassword(req.body)
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Please Check your email!"
    })
})

//reset password
const resetPassword = catchAsync(async (req, res) =>{
    const token = req.headers.authorization || "";
    console.log("req.body",req.body);
    const result = await AuthService.resetPassword(token, req.body)
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset successfully",
        data: result

    })
})


export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
};
