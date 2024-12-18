import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
const { isEmail } = validator;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: [5, 'Name must be at least 5 characters long'],
    maxlength: [50, 'Name must be less than 50 characters long']
  },
  userName: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    minlength: [5, 'Username must be at least 5 characters long'],
    maxlength: [50, 'Username must be less than 50 characters long']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    validate: [isEmail, 'Please provide a valid email'],
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [5, 'Password must be at least 5 characters long'],
    maxlength: [255, 'Password must be less than 255 characters long']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    minlength: 5,
    maxlength: 50
  },
  dateOfBirth: {
    type: Date,
    required: false
  },
  wishlist: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    default: []
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: false
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', userSchema);
export default User;
