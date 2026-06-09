import multer from "multer";

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();

export const upload = multer({ storage });
