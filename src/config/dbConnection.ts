import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()



const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.mongoURI||'sample');
    console.log('MongoDB connected successfully');
  } catch (err:any) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); 
  }
};

export default connectDB;
