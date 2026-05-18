import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;

// Interface for authenticated requests
export interface AuthRequest extends Request {
  user?: any;
}

// Middleware to authenticate requests
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // Extract token from headers
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // Verify token
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
