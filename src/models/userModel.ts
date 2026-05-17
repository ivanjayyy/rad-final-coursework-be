import { Document, model, Schema } from "mongoose";

// User roles
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

// User interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: UserRole[];
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
  },
  { timestamps: true },
);

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
