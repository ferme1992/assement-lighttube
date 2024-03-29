import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  favoritedVideos: string[];
  searchTerms: string[];
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  favoritedVideos: [
    {
      type: String,
    },
  ],
  searchTerms: [
    {
      type: String,
    },
  ],
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser>('User', UserSchema);
