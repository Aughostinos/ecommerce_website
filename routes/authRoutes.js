import { Router } from "express";

import { 
    postLogin, 
    postRegister, 
    postForgotPassword, 
    postResetPassword, 
    getLogout,
    getAuthenticatedUser,
} from '../controllers/AuthController.js';
import { deleteAccount } from '../controllers/userController.js';
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

// handle delete account
authRouter.delete('/delete', async (req, res) => {
    const { userId } = req.body;
  
    try {
      const response = await deleteAccount(userId);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// retrieve user details
authRouter.get('/user', authenticateUser, getAuthenticatedUser);

export default authRouter;