import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  deleteAccount,
  updateUser,
  updateProfilePic,
} from "../controller/userController";
import { upload } from "../middleware/upload";
import { requireRole } from "../middleware/role";
import { UserRole } from "../models/userModel";

const userRoutes = Router();

// POST /api/v1/user/update
userRoutes.put(
  "/update",
  authenticate,
  requireRole([UserRole.USER, UserRole.MODERATOR]),
  updateUser,
);

// POST /api/v1/user/delete
userRoutes.delete(
  "/delete",
  authenticate,
  requireRole([UserRole.USER, UserRole.MODERATOR]),
  deleteAccount,
);

// POST /api/v1/user/profile-pic
userRoutes.put(
  "/profile-pic",
  authenticate,
  requireRole([UserRole.USER, UserRole.MODERATOR]),
  upload.single("image"),
  updateProfilePic,
);

export default userRoutes;
