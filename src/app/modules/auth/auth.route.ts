import { Router } from "express";
import { AuthController } from "./auth.controller";
import auth from "../../../middlewires/auth";
import { USER_ROLE } from "../user/user.constant";


const AuthRouter = Router();

//Login User
AuthRouter.post('/login', AuthController.loginUser)

//Refresh Token
AuthRouter.post('/refresh-token', AuthController.refreshToken)

//Forget Password
AuthRouter.put('/change-password',auth(USER_ROLE.ADMIN, USER_ROLE.USER) ,AuthController.changePassword)