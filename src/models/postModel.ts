import mongoose, { Document } from "mongoose";

// Post status
export enum PostStatus {
  LOST = "LOST",
  FOUND = "FOUND",
}

export interface IPost extends Document {
  // title: string;
  // description: string;
  // author: mongoose.Types.ObjectId;
  // imageURL?: string;
  // tags?: string[];
  // comments?: mongoose.Types.ObjectId[];
  // bookmark?: mongoose.Types.ObjectId[];
  // createdAt?: Date;
  // updatedAt?: Date;

  status: PostStatus;
  petName: string;
  breed?: string;
  color: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  reward?: string;
  contactPhone: string[];
  contactEmail?: string[];
  imageURL?: string;
  author: mongoose.Types.ObjectId;
  bookmark?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    // title: { type: String, required: true },
    // description: { type: String, required: true },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    // imageURL: { type: String },
    // tags: [{ type: String }],
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    // bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    status: {
      type: String,
      enum: Object.values(PostStatus),
      required: true,
    },
    petName: { type: String, required: true },
    breed: { type: String },
    color: { type: String, required: true },
    lastSeenLocation: { type: String, required: true },
    lastSeenDate: { type: String, required: true },
    reward: { type: String },
    contactPhone: { type: [String], required: true },
    contactEmail: { type: [String] },
    imageURL: { type: String },
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
