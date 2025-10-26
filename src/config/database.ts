import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL!);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default mongoose;