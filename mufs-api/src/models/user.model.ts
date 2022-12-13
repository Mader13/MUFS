import { model, Schema } from "mongoose";

export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  idProject: string[];
  profilePicture: "";
  userRole: number;
  skills: string;
  courses: string[];
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idProject: { type: [String], required: false },
    profilePicture: { type: String, required: false },
    userRole: { type: Number, required: true },
    skills: { type: String, required: false },
    password: { type: String, required: true },
    courses: { type: [String], required: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const UserModel = model<User>("user", UserSchema);
