import { Request, Response } from "express";
import { generatePetFlyer, FlyerData } from "../utils/flyerService";
import { PostModel } from "../models/postModel";

export async function generateFlyer(req: Request, res: Response) {
  try {
    const post_id = req.params.id;

    if (!post_id) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await PostModel.findById(post_id);

    const flyerMockData: FlyerData = {
      status: post?.status || "LOST",
      petName: post?.petName || "Unknown Pet Name",
      breed: post?.breed || "Unknown Breed",
      color: post?.color || "Unknown Color",
      lastSeenLocation: post?.lastSeenLocation || "Unknown Location",
      lastSeenDate: post?.lastSeenDate || "Unknown Date",
      reward: post?.reward || "Unknown Reward",
      contactPhone: post?.contactPhone || ["123-456-7890"],
      contactEmail: post?.contactEmail || ["Kd2yO@example.com"],
      imageUrl: post?.imageURL || "",
    };

    const pdfStream = await generatePetFlyer(flyerMockData);

    // Set headers to open natively inside browser PDF viewers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="lost-pet-flyer.pdf"',
    );

    // Pipe the generation stream into the Express HTTP response object
    pdfStream.pipe(res);
  } catch (error) {
    console.error("Flyer Controller Error:", error);
    res.status(500).json({ error: "Could not generate printable PDF flyer." });
  }
}
