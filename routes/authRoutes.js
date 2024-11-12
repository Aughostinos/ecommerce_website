import { Router } from "express";

import { 
    postLogin, 
    postRegister, 
    postForgotPassword, 
    postResetPassword, 
    getLogout,
    getAuthenticatedUser,
} from '../controllers/AuthController.js';
import { authenticateUser } from "../middleware/authMiddleware.js";

const authRouter = Router();



// handle login
authRouter.post('/login', postLogin);

// handle registeration
authRouter.post('/register', postRegister);

// handle forgot password
authRouter.post('/forgot-password', postForgotPassword);

authRouter.post('/reset-password', postResetPassword);

// handle logout
authRouter.get('/logout', getLogout);

// retrieve user details
authRouter.get('/user', authenticateUser, getAuthenticatedUser);

export default authRouter;