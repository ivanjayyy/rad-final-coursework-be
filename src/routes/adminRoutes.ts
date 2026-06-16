import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../models/userModel";
import { banUser, deleteUser, getAllUsers, getDashboardStats } from "../controller/adminController";

const adminRoutes = Router();

adminRoutes.get(
  "/stats",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  getDashboardStats,
);

adminRoutes.get(
  "/get-users",
  authenticate,
  authenticate,
  requireRole([UserRole.MODERATOR]),
  getAllUsers,
);

adminRoutes.delete(
  "/delete-user/:id",
  authenticate,
  authenticate,
  requireRole([UserRole.MODERATOR]),
  deleteUser,
);

adminRoutes.put(
  "/ban-user/:id",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  authenticate,
  banUser,
);

export default adminRoutes;
