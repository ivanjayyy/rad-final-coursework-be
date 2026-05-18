import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { deleteUser, updateUser } from "../controller/userController";

const userRoutes = Router();

// POST /api/v1/user/update
userRoutes.put("/update", authenticate, updateUser);

// POST /api/v1/user/delete
userRoutes.delete("/delete", authenticate, deleteUser);

export default userRoutes;
