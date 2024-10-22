import { Router } from "express";

import { 
    get_login, 
    post_login, 
    get_register, 
    post_register, 
    post_forgot_password, 
    post_reset_password, 
    get_logout 
} from '../controllers/authController.js';


const router = Router();



// handle login
router.post('/login', post_login);

router.get('/login', get_login);

// handle registeration
router.post('/register', post_register);

router.get('/register', get_register);

// handle forgot password
router.post('/forgot-password', post_forgot_password);

router.post('/reset-password', post_reset_password);


// handle logout
router.get('/logout', get_logout);

// handle delete account
router.delete('/delete', async (req, res) => {
    const { userId } = req.body;
  
    try {
      const response = await deleteAccount(userId);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


export default router;