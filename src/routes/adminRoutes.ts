import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../models/userModel";
import {
  deleteUser,
  getAllUsers,
  changeRole,
  deletePost,
  allUsers,
  sendEmail,
  getDashboardSummary,
  getPostVelocityMetrics,
  getCaseAllocations,
} from "../controller/adminController";

const adminRoutes = Router();

// POST /api/v1/admin/post/delete
adminRoutes.delete(
  "/post/delete/:id",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  deletePost,
);

// POST /api/v1/admin/user/all
adminRoutes.get(
  "/user/all",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  getAllUsers,
);

// POST /api/v1/admin/user/delete
adminRoutes.delete(
  "/user/delete/:id",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  deleteUser,
);

// POST /api/v1/admin/all-users
adminRoutes.get(
  "/all-users",
  authenticate,
  requireRole([UserRole.ADMIN]),
  allUsers,
);

// POST /api/v1/admin/user/:id/role
adminRoutes.put(
  "/user/:id/role/:role",
  authenticate,
  requireRole([UserRole.ADMIN]),
  changeRole,
);

// POST /api/v1/admin/send-email
adminRoutes.post(
  "/send-email",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  sendEmail,
);

// POST /api/v1/admin/dashboard-summary
adminRoutes.get(
  "/dashboard-summary",
  authenticate,
  requireRole([UserRole.ADMIN]),
  getDashboardSummary,
);

// POST /api/v1/admin/analytics/posts-velocity
adminRoutes.get(
  "/analytics/posts-velocity",
  authenticate,
  requireRole([UserRole.ADMIN]),
  getPostVelocityMetrics,
);

// POST /api/v1/admin/analytics/case-allocations
adminRoutes.get(
  "/analytics/case-allocations",
  authenticate,
  requireRole([UserRole.ADMIN]),
  getCaseAllocations,
);

export default adminRoutes;
