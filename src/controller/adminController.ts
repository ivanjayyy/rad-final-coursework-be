import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { UserModel, UserRole } from "../models/userModel";
import { PostModel } from "../models/postModel";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    // Get all users, posts, comments, bookmarks, and reports
    const [users, posts] = await Promise.all([
      UserModel.countDocuments(),
      PostModel.countDocuments(),
      // CommentModel.countDocuments(),
      // BookmarkModel.countDocuments(),
      // ReportModel.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        users,
        posts,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const postId = req.params.id;
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

// Get all users
export const allUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await UserModel.find({}).select("-password");
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await UserModel.find({
      roles: { $in: [UserRole.USER] },
    }).select("-password");
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const banUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // user.banned = true;
    await user.save();
    res.status(200).json({ message: "User banned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error banning user" });
  }
};

export const unbanUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // user.banned = false;
    await user.save();
    res.status(200).json({ message: "User unbanned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unbanning user" });
  }
};

export const changeRole = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const role = req.params.role;

    if (role === "USER") {
      user.roles = [UserRole.USER];
    } else if (role === "MODERATOR") {
      user.roles = [UserRole.MODERATOR];
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    await user.save();

    res.status(200).json({ message: "User role changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing user role" });
  }
};

export const sendEmail = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email" });
  }
};
