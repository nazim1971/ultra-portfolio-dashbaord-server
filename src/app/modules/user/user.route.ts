import { Router } from "express";
import validateRequest from "../../../middlewires/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../../middlewires/auth";
import { USER_ROLE } from "./user.constant";
import { parseSingleImageWithData } from "../../utils/photoUploader";

export const UserRoute = Router();

//Create User
UserRoute.post('/create-user', validateRequest(UserValidation.createUser), UserController.createUser)

//Get My Profile
UserRoute.get("/me", auth(USER_ROLE.ADMIN, USER_ROLE.USER), UserController.getMyProfile);

//update Profile
UserRoute.patch(
  "/profile",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ...parseSingleImageWithData(),
  UserController.updateProfile
);

//Get All Users
UserRoute.get("/", auth(USER_ROLE.ADMIN), UserController.getMyProfile);

//Get Single User
UserRoute.get("/:id", auth(USER_ROLE.ADMIN), UserController.getSingleUser);

//Update User Status
UserRoute.get("/:id/status", auth(USER_ROLE.ADMIN), UserController.updateStatus);