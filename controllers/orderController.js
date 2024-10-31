import Order from "../models/Order.js";
import Product from '../models/Product.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// add order
export const createOrder = async (req, res) => {
    try {
      const userId = req.user._id;
      const { orderItems, shippingAddress, paymentMethod } = req.body;
  
      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ error: 'No order items' });
      }
  
      // Validate and update product stock
      for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ error: `Product not found: ${item.product}` });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({ error: `Insufficient stock for product ${product.name}` });
        }
  
        // Update stock atomically
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } },
          { new: true }
        );
      }
  
      // Calculate prices
      const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example shipping calculation
      const taxPrice = 0.15 * itemsPrice; // Example tax calculation
      const totalPrice = itemsPrice + shippingPrice + taxPrice;
  
      // Create new order
      const order = new Order({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isPaid: false,
      });
  
      await order.save();
  
      // clear the user's cart after order creation
      const user = await User.findById(userId);
      user.cart = [];
      await user.save();
  
      res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  };

// update order
export const markOrderAsPaid = async (req, res) => {
    try {
      const { id } = req.params; // Order ID
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      order.isPaid = true;
      order.paidAt = Date.now();
  
      await order.save();
  
      res.status(200).json({ message: 'Order marked as paid', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  };

// delete order
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get single order
export const getOrderById = async (req, res) => {
    try {
      const orderId = req.params.id;
      const userId = req.user._id;
  
      console.log(`Fetching order ${orderId} for user ${userId}`);
  
      const order = await Order.findOne({ _id: orderId, user: userId })
        .populate('orderItems.product', 'name image price');
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json({ order });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ error: 'Failed to fetch order details' });
    }
  };

// search order
export const searchOrder = async (req, res) => {
    const { query } = req.query;
    try {
        const order = await Order.find({ $text: { $search: query } });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};







