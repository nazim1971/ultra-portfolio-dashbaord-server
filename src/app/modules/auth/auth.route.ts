import { Router } from "express";
import { AuthController } from "./auth.controller";
import auth from "../../../middlewires/auth";
import { USER_ROLE } from "../user/user.constant";


export const AuthRoute = Router();

//Login User
AuthRoute.post('/login', AuthController.loginUser)

//Refresh Token
AuthRoute.post('/refresh-token', AuthController.refreshToken)

//Change Password
AuthRoute.put('/change-password',auth(USER_ROLE.ADMIN, USER_ROLE.USER) ,AuthController.changePassword)

//Forget Password
AuthRoute.post('/forgot-password', AuthController.forgotPassword)

//Reset Password
AuthRoute.post('/reset-password', AuthController.resetPassword)