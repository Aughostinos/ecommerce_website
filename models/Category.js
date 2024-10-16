const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
},
  categoryName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
  products: {
    type: Array,
    required: false
},
});

module.exports = mongoose.model('Category', categorySchema);
