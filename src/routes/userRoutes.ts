import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controller/userController";

const userRoutes = Router();

// POST /api/v1/user/update
userRoutes.put("/update", authenticate, updateUser);

// POST /api/v1/user/delete
userRoutes.delete("/delete", authenticate, deleteUser);

// GET /api/v1/user/all
userRoutes.get("/all", authenticate, getAllUsers);

export default userRoutes;
