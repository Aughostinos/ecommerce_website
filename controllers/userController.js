import User from "../models/User.js";
import Order from "../models/Order.js";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;;

// login user
export const login = async function(email, password) {
    const user = await User.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

// delete account
export const deleteAccount = async (userId) => {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) throw new Error('User not found');
      return { message: 'Account deleted successfully' };
    } catch (error) {
      throw error;
    }
};

// get profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) res.status(404).json({ error: 'User not found' });
    else res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update profile
export const updateProfile = async (userId, update) => {
    try {
      const user = await User.findByIdAndUpdate(userId, update, { new: true });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw error;
    }
};

// add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const productExists = user.wishList.some((item) => String(item) === productId);
    if (!productExists) {
      user.wishList.push(ObjectId(productId));
      await user.save();
    }

    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product to wishlist' });
  }
};

// remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.wishList = user.wishList.filter(id => !id.equals(productId));
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove product from wishlist' });
  }
};


// cart controller functions
// add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const user = await User.findById(userId);

    // Check if product already exists in cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      // Update quantity
      user.cart[cartItemIndex].quantity += quantity || 1;
    } else {
      // Add new item to cart
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await user.save();

    res.status(200).json({ message: 'Product added to cart successfully', cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove product from cart' });
  }
};

// update cart
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const user = await User.findById(userId);

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (cartItem) {
      cartItem.quantity = quantity;
      await user.save();
      res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
    } else {
      res.status(404).json({ error: 'Product not found in cart' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

// Get user cart and wishlist
export const getCartAndWishlist = async (req, res) => {
  try {
      console.log('User:', req.user);

      const user = await User.findById(req.user._id).populate('cart').populate('wishList');
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
          cart: user.cart,
          wishlist: user.wishList,
      });
  } catch (error) {
      console.error('Error fetching cart and wishlist:', error);
      res.status(500).json({ error: 'Failed to fetch cart and wishlist' });
  }
};

  // get user details
export const getUserDetails = async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw error;
    }
};

// update user details
export const updateUserDetails = async (userId, update) => {
    try {
      const user = await User.findByIdAndUpdate(userId, update, { new: true });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw error;
    }
};

// get user wishList
export const getUserWishList = async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      return user.wishList;
    } catch (error) {
      throw error;
    }
};

// get user cart
export const getUserCart = async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      return user.cart;
    } catch (error) {
      throw error;
    }
  };

// get user orders
export const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
      const orders = await Order.find({ userId });
      res.status(200).json(orders);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// get user product orders
export const getUserProductOrders = async (req, res) => {
  const { userId, productId } = req.params;
  try {
      const orders = await Order.find({ userId, productId });
      res.status(200).json(orders);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

