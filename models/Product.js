import mongoose, { Schema } from 'mongoose';

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: 5,
    maxlength: 50
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
  },
  image: [
    {
      type: String,
      required: [true, 'Product image is required'],
    },
  ],
  details: {
    type: Array,
    required: false
  },
  reviews: {
    type: Array,
    required: false
  },
  rating: {
    type: Number,
    required: false,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Product = mongoose.model('Product', productsSchema);
export default Product;
