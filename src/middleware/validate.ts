import { Request, Response, NextFunction } from "express";
import { validatePetImage } from "../utils/petValidator";

export async function validateImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Assumes you are using a file parser like 'multer' which populates req.file
  if (!req.file) {
    return res.status(400).json({ error: "No image provided." });
  }

  try {
    const validation = await validatePetImage(
      req.file.buffer,
      req.file.mimetype,
    );

    if (validation.isOffensiveOrInappropriate) {
      return res.status(400).json({
        error: "Upload blocked.",
        reason: "Image flagged as inappropriate content.",
      });
    }

    if (!validation.isRealAnimal) {
      return res.status(400).json({
        error: "Upload blocked.",
        reason: "Image does not appear to contain a valid animal.",
      });
    }

    // If it passes both, proceed straight to your main controller!
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server safety check failed." });
  }
}
