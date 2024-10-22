import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
  products: {
    type: Array,
    required: true
},
  quantity: {
    type: Number,
    required: true
},
  orderDate: {
    type: Date,
    required: true
},
  orderStatus: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
  orderTotal: {
    type: Number,
    required: true
},
});

module.exports = mongoose.model('Order', orderSchema);
