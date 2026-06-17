import { Router } from "express";
import {
  bookmarkPost,
  commentPost,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPostDetails,
  removeBookmark,
  getBookmarkPosts,
  updatePost,
} from "../controller/postController";
import { upload } from "../middleware/upload";
import { validateImage } from "../middleware/validate";
import { generateFlyer } from "../controller/flyerController";
import { authenticate } from "../middleware/auth";

const postRoutes = Router();

// POST /api/v1/post/create
postRoutes.post(
  "/create",
  authenticate,
  upload.single("image"),
  validateImage,
  createPost,
);

// GET /api/v1/post/all
postRoutes.get("/all", authenticate, getAllPosts);

// GET /api/v1/post/my
postRoutes.get("/my", authenticate, getMyPosts);

// POST /api/v1/post/flyer
postRoutes.get("/flyer/:id", authenticate, generateFlyer);

postRoutes.get("/bookmark-posts", authenticate, getBookmarkPosts);

// GET /api/v1/post/:id
postRoutes.get("/:id", authenticate, getPostDetails);

// POST /api/v1/post/update
postRoutes.put(
  "/update/:id",
  authenticate,
  upload.single("image"),
  validateImage,
  updatePost,
);

// POST /api/v1/post/delete
postRoutes.delete("/delete/:id", authenticate, deletePost);

postRoutes.put("/bookmark/:id", authenticate, bookmarkPost);

postRoutes.put("/unbookmark/:id", authenticate, removeBookmark);

// postRoutes.put("/comment", commentPost);

// postRoutes.delete("/comment/:id", deleteComment);

export default postRoutes;
