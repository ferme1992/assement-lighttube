import mongoose from 'mongoose';
import { mongoConfig } from './config/mongoDB';

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(mongoConfig.url);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
