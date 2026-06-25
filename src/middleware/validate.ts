import { Request, Response, NextFunction } from "express";
import { validatePetImage } from "../service/petValidator";

export async function validateImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.file) {
    return res.status(400).json({ error: "No image provided." });
  }

  try {
    // Validate the image
    const validation = await validatePetImage(
      req.file.buffer,
      req.file.mimetype,
    );

    // check if the image is safe
    if (validation.isOffensiveOrInappropriate) {
      return res.status(400).json({
        error: "Upload blocked.",
        reason: "Image flagged as inappropriate content.",
      });
    }

    // check if the image contains a real animal
    if (!validation.isRealAnimal) {
      return res.status(400).json({
        error: "Upload blocked.",
        reason: "Image does not appear to contain a valid animal.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server safety check failed." });
  }
}
