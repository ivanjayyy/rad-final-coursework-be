import mongoose, { Document } from "mongoose";

// Post status
export enum PostStatus {
  LOST = "LOST",
  FOUND = "FOUND",
}

// Post interface
export interface IPost extends Document {
  status: PostStatus;
  petName?: string;
  breed: string;
  color: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  reward?: string;
  contactPhone: string[];
  contactEmail?: string[];
  imageURL: string;
  author: mongoose.Types.ObjectId;
  bookmark?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Post schema
const postSchema = new mongoose.Schema<IPost>(
  {
    status: {
      type: String,
      enum: Object.values(PostStatus),
      required: true,
    },
    petName: { type: String },
    breed: { type: String, required: true },
    color: { type: String, required: true },
    lastSeenLocation: { type: String, required: true },
    lastSeenDate: { type: String, required: true },
    reward: { type: String },
    contactPhone: { type: [String], required: true },
    contactEmail: { type: [String] },
    imageURL: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookmark: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

export const PostModel = mongoose.model<IPost>("Post", postSchema);
