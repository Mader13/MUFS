import { model, Schema } from "mongoose";

export interface Project {
  id: string;
  title: string;
  description: string;
  members: string[];
  pendingMembers: string[];
  leader: string;
}

export const ProjectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    description: { type: String },
    members: { type: [String], required: false },
    leader: { type: String, required: true },
    pendingMembers: { type: [String], required: false },
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
