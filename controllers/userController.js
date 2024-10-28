import User from "../models/User.js";
import Order from "../models/Order.js";
import bcrypt from 'bcrypt';

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
export const getProfile = async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw error;
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
export const addToWishlist = async (userId, productId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      user.wishList.push(productId);
      await user.save();
      return { message: 'Product added to wishlist' };
    } catch (error) {
      throw error;
    }
};

// remove from wishlist
export const removeFromWishlist = async (userId, productId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      user.wishList = user.wishList.filter(id => id !== productId);
      await user.save();
      return { message: 'Product removed from wishlist' };
    } catch (error) {
      throw error;
    }
};

// add to cart
export const addToCart = async (userId, productId) => {
    try {
      const user = await User .findById(userId);
      if (!user) throw new Error('User not found');
      user.cart.push(productId);
      await user.save();
      return { message: 'Product added to cart' };
    }
    catch (error) {
      throw error;
    }
};

// remove from cart
export const removeFromCart = async (userId, productId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      user.cart = user.cart.filter(id => id !== productId);
      await user.save();
      return { message: 'Product removed from cart' };
    } catch (error) {
      throw error;
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

