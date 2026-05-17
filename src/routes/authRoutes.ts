import Router from "express";
import { loginUser, registerUser } from "../controller/authController";

const authRoutes = Router();

// POST /api/v1/auth/register
authRoutes.post("/register", registerUser);

// POST /api/v1/auth/login
authRoutes.post("/login", loginUser);

export default authRoutes;