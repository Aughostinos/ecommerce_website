import express from 'express';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware.js';
import {
    getAllUsers,
    updateUser,
    deleteUser,
    getAllOrders,
    updateOrderStatus,
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/adminController.js';

const adminRouter = express.Router();

// handle users
adminRouter.get('/users', authenticateUser, authorizeAdmin, getAllUsers);
adminRouter.put('/users/:id', authenticateUser, authorizeAdmin, updateUser);
adminRouter.delete('/users/:id', authenticateUser, authorizeAdmin, deleteUser);


// handle Orders
adminRouter.get('/orders', authenticateUser, authorizeAdmin, getAllOrders);
adminRouter.put('/orders/:id', authenticateUser, authorizeAdmin, updateOrderStatus);

// handle categories
adminRouter.get('/categories', authenticateUser, authorizeAdmin, getAllCategories);
adminRouter.post('/categories', authenticateUser, authorizeAdmin, addCategory);
adminRouter.put('/categories/:id', authenticateUser, authorizeAdmin, updateCategory);
adminRouter.delete('/categories/:id', authenticateUser, authorizeAdmin, deleteCategory);

// handle products
adminRouter.get('/products', authenticateUser, authorizeAdmin, getAllProducts);
adminRouter.post('/products', authenticateUser, authorizeAdmin, addProduct);
adminRouter.put('/products/:id', authenticateUser, authorizeAdmin, updateProduct);
adminRouter.delete('/products/:id', authenticateUser, authorizeAdmin, deleteProduct);



export default adminRouter;
