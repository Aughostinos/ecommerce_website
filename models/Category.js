import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
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
