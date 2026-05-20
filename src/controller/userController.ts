import { Response } from "express";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../middleware/auth";

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.user.sub, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.user.sub);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const getUserDetails = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await UserModel.find({});
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
