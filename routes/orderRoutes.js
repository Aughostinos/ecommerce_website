import { Router } from "express";
import { 
    getOrders,
    createOrder,
    markOrderAsPaid,
    deleteOrder,
    getOrderById,
    getUserOrders
} from '../controllers/orderController.js';
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";

const orderRouter = Router();

//this should list all orders
orderRouter.get('/get-orders', authenticateUser, getOrders);

//this should add an order
orderRouter.post('/create-order', authenticateUser, createOrder);

//this should get a single order
orderRouter.get('/:id', authenticateUser, getOrderById);

//this should update an order
orderRouter.put('/mark-as-paid/:id', authenticateUser ,markOrderAsPaid);

//this should delete an order
orderRouter.delete('/delete-order/:id', authenticateUser, deleteOrder);

// this should get all orders by a user
orderRouter.get('/my-orders', authenticateUser, getUserOrders);

export default orderRouter;

