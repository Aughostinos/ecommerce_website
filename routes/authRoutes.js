import { Router } from "express";

import { 
    get_login, 
    post_login, 
    get_register, 
    post_register, 
    post_forgot_password, 
    post_reset_password, 
    get_logout,
} from '../controllers/authController.js';
import { deleteAccount } from '../controllers/userController.js';
import { authenticateUser } from "../middleware/authMiddleware.js";

const authRouter = Router();



// handle login
authRouter.post('/login', post_login);

authRouter.get('/login', get_login);

// handle registeration
authRouter.post('/register', post_register);

authRouter.get('/register', get_register);

// handle forgot password
authRouter.post('/forgot-password', post_forgot_password);

authRouter.post('/reset-password', post_reset_password);


// handle logout
authRouter.get('/logout', get_logout);

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
authRouter.get('/user', authenticateUser, (req, res) => {
 res.status(200).json({ user: req.user });
  });

export default authRouter;