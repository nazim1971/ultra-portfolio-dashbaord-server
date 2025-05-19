import { model, Schema } from "mongoose";
import config from "../../config";
import bcrypt from "bcrypt";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import { TUser, UserStatics } from "./user.interface";
import { StatusFullError } from "../../error/StatusFullError";
import { httpStatus } from "../../interface/httpStatus";

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'USER',
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: "ACTIVE",
    },
    name: { type: String, required: true },
    image: { type: String },
    contactNumber: { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.salt));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.validateUser = async function (email?: string, path = "") {
  if (!email) {
    throw new StatusFullError(
      false,
      "BAD_REQUEST",
      httpStatus.BAD_REQUEST,
      "Please provide a valid email!",
      path
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new StatusFullError(
      false,
      "NOT_FOUND",
      httpStatus.NOT_FOUND,
      `No user found with email: ${email}!`,
      path
    );
  }

  if (user.status === "BLOCKED") {
    throw new StatusFullError(
      false,
      "FORBIDDEN",
      httpStatus.FORBIDDEN,
      `User with email ${email} is blocked!`,
      path
    );
  }

  return user;
};

userSchema.statics.isUserExists = async function (identifier: string) {
  // Check if the identifier is an email
  if (identifier.includes("@")) {
    return await User.findOne({ email: identifier }).select("+password");
  } else {
    return await User.findById(identifier).select("+password");
  }
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserStatics>("user", userSchema);
