import { Router } from "express";
import {
  getMyDetails,
  loginUser,
  refreshToken,
  registerUser,
  resetPassword,
} from "../controller/authController";
import { authenticate } from "../middleware/auth";

const authRoutes = Router();

// POST /api/v1/auth/register
authRoutes.post("/register", registerUser);

// POST /api/v1/auth/login
authRoutes.post("/login", loginUser);

// GET /api/v1/auth/me
authRoutes.get("/me", authenticate, getMyDetails);

// POST /api/v1/auth/refresh
authRoutes.post("/refresh", refreshToken);

authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
