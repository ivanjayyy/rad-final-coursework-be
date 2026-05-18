import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";
import dotenv from "dotenv";

dotenv.config();

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

// Generate access and refresh tokens
export const signAccessToken = (user: IUser): string => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      roles: user.roles,
    },
    JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

// Generate refresh token
export const signRefreshToken = (user: IUser): string => {
  return jwt.sign(
    {
      sub: user._id.toString(),
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );
};
