import { Router } from "express";
import { 
    getProfile,
    updateProfile
} from '../controllers/userController.js';

const userRouter = Router();

// this should show the user's profile
userRouter.get('/profile', getProfile);

// this should update the user's profile
userRouter.put('/update-profile', updateProfile);

// this should add a product to the user's wishlist
userRouter.post('/add-to-wishlist', addToWishlist);

// this should remove a product from the user's wishlist
userRouter.delete('/remove-from-wishlist', removeFromWishlist);

// this should add a product to the user's cart
userRouter.post('/add-to-cart', addToCart);

// this should remove a product from the user's cart
userRouter.delete('/remove-from-cart', removeFromCart);


export default userRouter;
