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

const postRoutes = Router();

postRoutes.post("/create", upload.single("image"), createPost);

postRoutes.get("/all", getAllPosts);

postRoutes.get("/my", getMyPosts);

// postRoutes.get("/:id", getPostDetails);

// postRoutes.put("/update", updatePost);

// postRoutes.delete("/delete", deletePost);

// postRoutes.put("/bookmark", bookmarkPost);

// postRoutes.put("/unbookmark", removeBookmark);

// postRoutes.put("/comment", commentPost);

// postRoutes.delete("/comment/:id", deleteComment);

export default postRoutes;
