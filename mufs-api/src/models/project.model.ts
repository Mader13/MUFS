import { model, Schema } from "mongoose";

export interface Project {
  id: string;
  title: string;
  description: string;
  members: string[];
  pendingMembers: string[];
  leader: string;
  faculty: string;
  studies: string[];
}

export const ProjectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    description: { type: String },
    members: { type: [String], required: false },
    leader: { type: String, required: true },
    faculty: { type: String, required: true },
    studies: { type: [String], required: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const ProjectModel = model<Project>("project", ProjectSchema);
