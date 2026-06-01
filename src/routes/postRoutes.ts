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
  updatePost,
} from "../controller/postController";
import { upload } from "../middleware/upload";
import { validateImage } from "../middleware/validate";
import { generateFlyer } from "../controller/flyerController";
import { authenticate } from "../middleware/auth";

const postRoutes = Router();

postRoutes.post(
  "/create",
  authenticate,
  upload.single("image"),
  validateImage,
  createPost,
);

postRoutes.get("/all", authenticate, getAllPosts);

postRoutes.get("/my", authenticate, getMyPosts);

postRoutes.get("/flyer/:id", authenticate, generateFlyer);

postRoutes.get("/:id", authenticate, getPostDetails);

postRoutes.put(
  "/update/:id",
  authenticate,
  upload.single("image"),
  validateImage,
  updatePost,
);

postRoutes.delete("/delete/:id", authenticate, deletePost);

// postRoutes.put("/bookmark", bookmarkPost);

// postRoutes.put("/unbookmark", removeBookmark);

// postRoutes.put("/comment", commentPost);

// postRoutes.delete("/comment/:id", deleteComment);

export default postRoutes;
