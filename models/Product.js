import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
  price: {
    type: Number,
    required: true
},
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
},
  category: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
  productStock: {
    type: Number,
    required: true
},
  productImage: {
    type: String,
    required: true
},
  productReviews: {
    type: Array,
    required: false
},
});

module.exports = mongoose.model('Product', productsSchema);
