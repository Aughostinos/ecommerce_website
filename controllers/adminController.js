import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

// handle user operations

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update user's data
export const adminUpdateUser = async (req, res) => {
  try {
    const { name, userName, email, phone, dateOfBirth, role } = req.body;
    const updates = { name, userName, email, phone, dateOfBirth, role };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({ message: 'User updated', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handle user deletion
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handle order operations

// handle order operations
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('orderItems.product');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handle product operations

// handle product operations
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: req.body.image || [],
    });

    await product.save();

    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handle product deletion
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handle category operations

// handle category operations
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create category
export const createCategory = async (req, res) => {
  try {
    const { categoryName, description } = req.body;

    const category = new Category({
      categoryName,
      description,
    });

    await category.save();

    res.status(201).json({ message: 'Category created', category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handle category deletion
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
