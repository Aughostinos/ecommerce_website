import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

// connect to MongoDB database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
  }
};

export default connectDb;
