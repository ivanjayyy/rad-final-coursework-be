import { Router } from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
} from "../controller/authController";

const authRoutes = Router();

// POST /api/v1/auth/register
authRoutes.post("/register", registerUser);

// POST /api/v1/auth/login
authRoutes.post("/login", loginUser);

// POST /api/v1/auth/refresh
authRoutes.post("/refresh", refreshToken);

export default authRoutes;
