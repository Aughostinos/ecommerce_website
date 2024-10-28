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

export default userRouter;
