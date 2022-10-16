import { model, Schema } from "mongoose";

export interface Project {
  id: string;
  title: string;
  description: string;
  members: number[];
  leader: string;
}

export const ProjectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    description: { type: String },
    members: { type: [Number], required: false },
    leader: { type: String, required: true },
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
