import { Router } from "express";
import { 
    getProfile,
    updateProfile,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
    getCartAndWishlist,
    updateCartItem
} from '../controllers/userController.js';
import { authenticateUser } from "../middleware/authMiddleware.js";

const userRouter = Router();

// this should show the user's profile
userRouter.get('/profile', authenticateUser, getProfile);

// this should update the user's profile
userRouter.put('/update-profile', authenticateUser, updateProfile);

// this should add a product to the user's wishlist
userRouter.post('/add-to-wishlist', authenticateUser, addToWishlist);

// this should remove a product from the user's wishlist
userRouter.delete('/remove-from-wishlist', authenticateUser, removeFromWishlist);

// this should add a product to the user's cart
userRouter.post('/add-to-cart', authenticateUser, addToCart);

// this should remove a product from the user's cart
userRouter.delete('/remove-from-cart', authenticateUser, removeFromCart);

// this should update the user's cart
userRouter.put('/update-cart-item', authenticateUser, updateCartItem);

// this should get all products user's cart adn wishlist
userRouter.get('/get-cart-wishlist', authenticateUser, getCartAndWishlist);



export default userRouter;
