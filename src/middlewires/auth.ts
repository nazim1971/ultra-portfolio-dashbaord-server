import { UserRole } from "./../app/modules/user/user.constant";
import { catchAsync } from "../app/shared/catchAsync";
import { User } from "../app/modules/user/user.model";
import { StatusFullError } from "../app/error/StatusFullError";
import { jwtHelpers } from "../app/utils/jwtHelper";
import { CustomPayload } from "../app/interface";
import config from "../app/config";
import { httpStatus } from "../app/interface/httpStatus";

const auth = (...roles: UserRole[]) => {
  return catchAsync(async (req, _res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new StatusFullError(
        false,
        "UNAUTHORIZED",
        httpStatus.UNAUTHORIZED,
        "You are not authorized!",
        req.originalUrl
      );
    }

    // checking if the given token is valid
    const decoded = jwtHelpers.verifyToken(
      token,
      config.jwt.accessSecret
    ) as CustomPayload;

    req.user = decoded;
    const { email, role, iat } = decoded;

    await User.validateUser(email);

    if (roles && !roles.includes(role as UserRole)) {
      throw new StatusFullError(
        false,
        "UNAUTHORIZED",
        httpStatus.UNAUTHORIZED,
        "You are not authorized!"
      );
    }

    req.user = decoded;
    next();
  });
};

export default auth;
