import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const requiredEnv = [
  "PORT",
  "BCRYPT_SALT",
  "NODE_ENV",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "REFRESH_TOKEN_SECRET",
  "REFRESH_TOKEN_EXPIRES_IN",
  "RESET_PASS_TOKEN",
  "RESET_PASS_EXPIRES_IN",
  "RESET_PASS_LINK",
  "NODE_EMAIL",
  "NODE_EMAIL_PASS",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "DB_URL",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`${key} is required in .env file`);
  }
}

const config = {
  port: Number(process.env.PORT),
  salt: Number(process.env.BCRYPT_SALT),
  nodeEnv: String(process.env.NODE_ENV),
  dbUri: String(process.env.DB_URL),

  jwt: {
    accessSecret: String(process.env.JWT_SECRET),
    accessExpiresIn: String(process.env.JWT_EXPIRES_IN),
    refreshSecret: String(process.env.REFRESH_TOKEN_SECRET),
    refreshExpiresIn: String(process.env.REFRESH_TOKEN_EXPIRES_IN),
  },

  password: {
    resetToken: String(process.env.RESET_PASS_TOKEN),
    resetExpiresIn: String(process.env.RESET_PASS_EXPIRES_IN),
    resetLink: String(process.env.RESET_PASS_LINK),
  },

  email: {
    user: String(process.env.NODE_EMAIL),
    pass: String(process.env.NODE_EMAIL_PASS),
  },

  cloudinary: {
    name: String(process.env.CLOUDINARY_CLOUD_NAME),
    apiKey: String(process.env.CLOUDINARY_API_KEY),
    apiSecret: String(process.env.CLOUDINARY_API_SECRET),
  },
};

export default config;
