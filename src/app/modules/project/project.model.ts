import { Schema, model } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema<TProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    liveSiteLink: { type: String, required: true },
    clientCodeLink: { type: String, required: true },
    serverCodeLink: { type: String, required: true },
    images: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Project = model<TProject>('Project', projectSchema);
export default Project;
