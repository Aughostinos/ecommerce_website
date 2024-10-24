import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Connected to MongoDB');
  } catch(err) {
    console.error('Could not connect to MongoDB', err);
  }
};

export default connectDb;
