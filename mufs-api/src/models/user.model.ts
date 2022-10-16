import { model, Schema } from "mongoose";

export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  idProject: number;
  profilePicture: "";
  userRole: number;
  skills: string;
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idProject: { type: Number },
    profilePicture: { type: String, required: false },
    userRole: { type: Number, required: true },
    skills: { type: String, required: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const UserModel = model<User>("user", UserSchema);
