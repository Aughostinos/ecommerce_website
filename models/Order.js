import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    minlength: 5,
    maxlength: 50
},
  products: {
    type: Array,
    required: [true, 'Products are required']
},
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    default: 0
},
  orderStatus: {
    type: String,
    required: [true, 'Order status is required'],
    minlength: 5,
    maxlength: 50,
    default: 'Pending'
},
  orderTotal: {
    type: Number,
    required: [true, 'Order total is required'],
},
  shippingAddress: {
    type: String,
    required: [true, 'Shipping address is required'],
    minlength: 5,
    maxlength: 255
},
  paymentMethod: {
    type: String,
    required: [true,  'Payment method is required'],
    minlength: 5,
    maxlength: 50
},
  paymentResult: {
    type: Object,
    required: false
},
  shippingPrice: {
    type: Number,
    required: false
},
  taxPrice: {
    type: Number,
    required: false
},
  isPaid: {
    type: Boolean,
    required: false,
    default: false
},
  paidAt: {
    type: Date,
    required: false
},
  isDelivered: {
    type: Boolean,
    required: false,
    default: false
},
  deliveredAt: {
    type: Date,
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

const Order = mongoose.model('Order', orderSchema);
export default Order;
