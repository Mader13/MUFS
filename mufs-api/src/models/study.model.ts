import { model, Schema } from "mongoose";

export interface Study {
  id: string;
  title: string;
  description: string;
  members: string[];
  leader: string;
  course: string;
  date: Date;
}

export const StudySchema = new Schema<Study>(
  {
    title: { type: String, required: true },
    description: { type: String },
    members: { type: [String], required: false },
    leader: { type: String, required: true },
    course: { type: String, required: true },
    date: { type: Date, required: true },
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

export const StudyModel = model<Study>("study", StudySchema);
