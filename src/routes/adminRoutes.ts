import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../models/userModel";
import {
  banUser,
  deleteUser,
  getAllUsers,
  getDashboardStats,
  unbanUser,
  changeRole,
  deletePost,
  allUsers,
  sendEmail,
  getDashboardSummary,
  getPostVelocityMetrics,
  getCaseAllocations,
} from "../controller/adminController";

const adminRoutes = Router();

adminRoutes.delete(
  "/post/delete/:id",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  deletePost,
);

adminRoutes.get(
  "/user/all",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  getAllUsers,
);

adminRoutes.delete(
  "/user/delete/:id",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  deleteUser,
);

// adminRoutes.put(
//   "/ban-user/:id",
//   authenticate,
//   requireRole([UserRole.MODERATOR]),
//   banUser,
// );

// adminRoutes.put(
//   "/unban-user/:id",
//   authenticate,
//   requireRole([UserRole.MODERATOR]),
//   unbanUser,
// );

adminRoutes.get(
  "/all-users",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  allUsers,
);

adminRoutes.put(
  "/user/:id/role/:role",
  authenticate,
  requireRole([UserRole.ADMIN]),
  changeRole,
);

adminRoutes.post(
  "/send-email",
  authenticate,
  requireRole([UserRole.ADMIN, UserRole.MODERATOR]),
  sendEmail,
);

adminRoutes.get(
  "/dashboard-summary",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  getDashboardSummary,
);
adminRoutes.get(
  "/analytics/posts-velocity",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  getPostVelocityMetrics,
);
adminRoutes.get(
  "/analytics/case-allocations",
  authenticate,
  requireRole([UserRole.MODERATOR]),
  getCaseAllocations,
);

export default adminRoutes;
