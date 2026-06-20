import { Router } from "express";
import {
  bookmarkPost,
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  removeBookmark,
  getBookmarkPosts,
  updatePost,
} from "../controller/postController";
import { upload } from "../middleware/upload";
import { validateImage } from "../middleware/validate";
import { getFlyerRoute } from "../controller/flyerController";
import { authenticate } from "../middleware/auth";
import { UserRole } from "../models/userModel";
import { requireRole } from "../middleware/role";

const postRoutes = Router();

// POST /api/v1/post/create
postRoutes.post(
  "/create",
  authenticate,
  requireRole([UserRole.USER]),
  upload.single("image"),
  validateImage,
  createPost,
);

// GET /api/v1/post/all
postRoutes.get(
  "/all",
  authenticate,
  requireRole([UserRole.MODERATOR, UserRole.USER]),
  getAllPosts,
);

// GET /api/v1/post/my
postRoutes.get("/my", authenticate, requireRole([UserRole.USER]), getMyPosts);

// POST /api/v1/post/flyer
postRoutes.get(
  "/flyer/:id",
  // authenticate,
  // requireRole([UserRole.USER]),
  getFlyerRoute,
);

postRoutes.get(
  "/bookmark-posts",
  authenticate,
  requireRole([UserRole.USER]),
  getBookmarkPosts,
);

// GET /api/v1/post/:id
// postRoutes.get("/:id", authenticate, getPostDetails);

// POST /api/v1/post/update
postRoutes.put(
  "/update/:id",
  authenticate,
  requireRole([UserRole.USER]),
  upload.single("image"),
  validateImage,
  updatePost,
);

// POST /api/v1/post/delete
postRoutes.delete(
  "/delete/:id",
  authenticate,
  requireRole([UserRole.USER]),
  deletePost,
);

postRoutes.put(
  "/bookmark/:id",
  authenticate,
  requireRole([UserRole.USER]),
  bookmarkPost,
);

postRoutes.put(
  "/unbookmark/:id",
  authenticate,
  requireRole([UserRole.USER]),
  removeBookmark,
);

export default postRoutes;
