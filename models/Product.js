const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
},
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
