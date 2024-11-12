import { Router } from "express";
import { 
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
    getCartAndWishlist,
    updateCartItem,
    getProfile,
    updateUserProfile
} from '../controllers/userController.js';
import { getUserOrders } from "../controllers/orderController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const userRouter = Router();

// this should show the user's profile
userRouter.get('/profile', authenticateUser, getProfile);

// this should update the user's profile
userRouter.put('/update-profile', authenticateUser, updateUserProfile);

// this should add a product to the user's wishlist
userRouter.post('/add-to-wishlist', authenticateUser, addToWishlist);

// this should remove a product from the user's wishlist
userRouter.post('/remove-from-wishlist', authenticateUser, removeFromWishlist);

// this should add a product to the user's cart
userRouter.post('/add-to-cart', authenticateUser, addToCart);

// this should remove a product from the user's cart
userRouter.post('/remove-from-cart', authenticateUser, removeFromCart);

// this should update the user's cart
userRouter.put('/update-cart-item', authenticateUser, updateCartItem);

// this should get all products user's cart adn wishlist
userRouter.get('/get-cart-wishlist', authenticateUser, getCartAndWishlist);

// this should get all orders by a user
userRouter.get('/my-orders', authenticateUser, getUserOrders);


export default userRouter;
