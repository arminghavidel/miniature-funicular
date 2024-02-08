// users.entity.ts
import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  job: string;
  avatar?: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    job: { type: String, required: true },
    avatar: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserDocument>('User', userSchema);
