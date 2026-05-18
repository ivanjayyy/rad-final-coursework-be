import { Request, Response } from "express";
import { UserModel, UserRole } from "../models/userModel";
import { signAccessToken, signRefreshToken } from "../utils/tokens";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Environment variables
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

// User registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    // Create new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      roles: [UserRole.USER], // Default role
      approved: true,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// User login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate access and refresh tokens
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        username: user?.username,
        roles: user?.roles,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

// Refresh token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // Verify refresh token
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    // Find user by ID
    const user = await UserModel.findById(payload.sub);
    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const newAccessToken = signAccessToken(user);

    res.status(200).json({
      message: "Token refreshed successfully",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error refreshing token" });
  }
};
