import { Schema, model } from 'mongoose';
import { TSkill } from './skill.interface';

const skillSchema = new Schema<TSkill>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Skill = model<TSkill>('Skill', skillSchema);
