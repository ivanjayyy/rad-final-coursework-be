import mongoose, { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  author: mongoose.Types.ObjectId;
  imageURL?: string;
  tags?: string[];
  comments?: mongoose.Types.ObjectId[];
  bookmark?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageURL: { type: String },
    tags: [{ type: String }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export const PostModel = mongoose.model<IPost>("Post", postSchema);
