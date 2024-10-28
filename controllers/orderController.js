import Order from "../models/Order.js";

// get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// add order
export const addOrder = async (req, res) => {
    const { userId, productId, quantity, total } = req.body;
    try {
        const order = await Order.create({ userId, productId, quantity, total });
        res.status(200).json({ message: 'Order added successfully', order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update order
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { userId, productId, quantity, total } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(id, { userId, productId, quantity, total }, { new: true });
        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete order
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get single order
export const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// search order
export const searchOrder = async (req, res) => {
    const { query } = req.query;
    try {
        const order = await Order.find({ $text: { $search: query } });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};







