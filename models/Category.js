import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, 'Category name is required'],
    minlength: 5,
    maxlength: 50
},
  products: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: false
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

const Category = mongoose.model('Category', categorySchema);
export default Category;
