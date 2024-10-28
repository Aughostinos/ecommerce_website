import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
},
  products: {
    type: Array,
    required: [true, 'Products are required']
},
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 1
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

// middleware to calculate order total
orderSchema.pre('save', function(next) {

  // check quantity of products
  this.products.forEach(product => {
    if (product.quantity > product.stock) {
      throw new Error('Product is out of stock');
    }
  });
 
  const productTotal = this.products.reduce(
    (acc, product) => acc + product.price * product.quantity, 0);

  // calculate total (product total + tax + shipping)
  this.orderTotal = productTotal + this.taxPrice + this.shippingPrice;
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
