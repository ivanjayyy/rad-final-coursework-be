import { Response } from "express";
import { FlyerData, generatePetFlyer } from "../service/flyerService";
import { PostModel } from "../models/postModel";
import { AuthRequest } from "../middleware/auth";

// Get flyer
export const getFlyerRoute = async (req: AuthRequest, res: Response) => {
  try {
    const postId = req.params.id;
    console.log("Post ID:", postId);

    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Get post data
    const postData: FlyerData = {
      status: post.status ?? "",
      petName: post.petName ?? "",
      breed: post.breed ?? "",
      color: post.color ?? "",
      lastSeenLocation: post.lastSeenLocation ?? "",
      lastSeenDate: post.lastSeenDate ?? "",
      reward: post.reward ?? "",
      contactPhone: post.contactPhone ?? "",
      contactEmail: post.contactEmail ?? "",
      imageUrl: post.imageURL ?? "",
    };

    const pdfStream = await generatePetFlyer(postData);

    // 🌟 THESE HEADERS ARE CRITICAL FOR OPENING IN NEW WINDOW:
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=flyer.pdf");

    // Pipe the readable Stream directly to response window pipeline
    pdfStream.pipe(res);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not generate flyer stream document." });
  }
};
