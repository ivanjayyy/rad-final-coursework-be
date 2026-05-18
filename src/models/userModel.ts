import { Document, model, Schema } from "mongoose";

// User roles
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

// User interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: UserRole[];
  approved: boolean;
}

// User schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.USER],
    },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const UserModel = model<IUser>("User", userSchema);
