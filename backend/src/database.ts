import mongoose from 'mongoose';
import config from './config/config';

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(config.DB.URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
