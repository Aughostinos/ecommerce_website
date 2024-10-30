import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: 1,
      },
      price: {
        type: Number,
        required: [true, 'Product price is required'],
      },
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: [true, 'Full name is required'] },
    address: { type: String, required: [true, 'Address is required'] },
    city: { type: String, required: [true, 'City is required'] },
    postalCode: { type: String, required: [true, 'Postal code is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  itemsPrice: {
    type: Number,
    required: [true, 'Items price is required'],
  },
  shippingPrice: {
    type: Number,
    required: [true, 'Shipping price is required'],
  },
  taxPrice: {
    type: Number,
    required: [true, 'Tax price is required'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: Date,
}, {
  timestamps: true,
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
