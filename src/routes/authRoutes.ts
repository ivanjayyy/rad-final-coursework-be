import { Router } from "express";
import {
  getMyDetails,
  loginUser,
  refreshToken,
  registerUser,
  resetPassword,
} from "../controller/authController";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../models/userModel";

const authRoutes = Router();

// POST /api/v1/auth/register
authRoutes.post("/register", registerUser);

// POST /api/v1/auth/login
authRoutes.post("/login", loginUser);

// GET /api/v1/auth/me
authRoutes.get(
  "/me",
  authenticate,
  requireRole([UserRole.USER, UserRole.MODERATOR]),
  getMyDetails,
);

// POST /api/v1/auth/refresh
authRoutes.post("/refresh", refreshToken);

// POST /api/v1/auth/reset-password
authRoutes.post(
  "/reset-password",
  // authenticate,
  // requireRole([UserRole.USER, UserRole.MODERATOR]),
  resetPassword,
);

export default authRoutes;
