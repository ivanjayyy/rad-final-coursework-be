import { Response } from "express";
import cloudinary from "../config/cloudinary";
import { AuthRequest } from "../middleware/auth";
import { PostModel } from "../models/postModel";

export const createPost = async (req: AuthRequest, res: Response) => {
  // const { title, description, tags } = req.body;
  const {
    status,
    petName,
    breed,
    color,
    lastSeenLocation,
    lastSeenDate,
    reward,
    contactPhone,
    contactEmail,
  } = req.body;

  try {
    let imageURL = "";
    if (req.file) {
      const result: any = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: "posts" },
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

    const newPost = new PostModel({
      // title,
      // description,
      // tags,
      // author: req.user.sub,
      // imageURL,

      status,
      petName,
      breed,
      color,
      lastSeenLocation,
      lastSeenDate,
      reward,
      contactPhone,
      contactEmail,
      imageURL,
      author: req.user.sub,
    });

    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", data: savedPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const getAllPosts = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [posts, totalPosts] = await Promise.all([
      PostModel.find({}).skip(skip).limit(limit).populate("author", "username"),
      PostModel.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
      pagination: {
        currentPage: page,
        totalPosts: totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const getMyPosts = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const userId = req.user?.sub;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }

    const query = { author: userId };

    const [posts, totalPosts] = await Promise.all([
      PostModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      PostModel.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
      pagination: {
        currentPage: page,
        totalPosts: totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const getPostDetails = async (req: AuthRequest, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId).populate(
      "author",
      "username",
    );
    res.status(200).json({ message: "Post fetched successfully", data: post });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

export const updatePost = async (req: AuthRequest, res: Response) => {
  const {
    petName,
    breed,
    color,
    lastSeenLocation,
    lastSeenDate,
    reward,
    contactPhone,
    contactEmail,
  } = req.body;

  try {
    const postId = req.params.id;

    let imageURL = "";
    if (req.file) {
      const result: any = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: "posts" },
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

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        petName,
        breed,
        color,
        lastSeenLocation,
        lastSeenDate,
        reward,
        contactPhone,
        contactEmail,
        imageURL,
      },
      {
        new: true,
      },
    );
    res
      .status(200)
      .json({ message: "Post updated successfully", data: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
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

export const bookmarkPost = async (req: AuthRequest, res: Response) => {};

export const removeBookmark = async (req: AuthRequest, res: Response) => {};

export const commentPost = async (req: AuthRequest, res: Response) => {};

export const deleteComment = async (req: AuthRequest, res: Response) => {};
