import { Response } from "express";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../middleware/auth";
import cloudinary from "../config/cloudinary";

// Update user
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

// Delete user
export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.sub;
    const user = await UserModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const updateProfilePic = async (req: AuthRequest, res: Response) => {
  try {
    let imageURL = "";
    if (req.file) {
      const result: any = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: "users" },
          (error: any, result: any) => {
            if (error) {
              return reject(error);
            } else {
              resolve(result);
            }
          },
        );
        upload_stream.end(req.file?.buffer);
      });
      imageURL = result.secure_url;
    }

    const user = await UserModel.findByIdAndUpdate(
      req.user.sub,
      { profilePic: imageURL },
      { new: true },
    );
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};
