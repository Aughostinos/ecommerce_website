import { Router } from "express";
import { 
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    searchOrder
} from '../controllers/orderController.js';

const orderRouter = Router();

//this should list all orders
orderRouter.get('/get-orders', getOrders);

//this should add an order
orderRouter.post('/add-order', addOrder);

//this should update an order
orderRouter.put('/update-order/:id', updateOrder);

//this should delete an order
orderRouter.delete('/delete-order/:id', deleteOrder);

//this should get a single order
orderRouter.get('/get-order/:id', getOrder);

//this should search for an order
orderRouter.get('/search-order', searchOrder);

export default orderRouter;

