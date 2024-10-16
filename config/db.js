const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://August:<db_password>@database.uchqx.mongodb.net/?retryWrites=true&w=majority&appName=Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Connected to MongoDB');
  } catch(err) {
    console.error('Could not connect to MongoDB', err);
  }
};

module.exports = connectDb;
