const express=require('express')
const alooRouter=express.Router()
const {Order,Notification}=require('../db')
const { JWT_SECRET } = require('../config')
const { v4: uuidv4 } = require('uuid');
const jwt=require('jsonwebtoken')


alooRouter.post('/addorder', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            msg: "Not authorized, try signing in again!"
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1],JWT_SECRET);
        const userId = decoded.userId;

        const { orderQuantity } = req.body;
        const orderId = uuidv4();  // Generate a unique orderId

        await Order.create({
            orderId: orderId,    // Save the generated orderId
            userId: userId,
            orderQuantity: orderQuantity
        });

        const newNotification = await Notification.create({
            userId: userId,
            message: "Your potatoes have been ordered successfully"
        });

        return res.status(200).json({
            msg: "Order created successfully",
            orderId: orderId,
            notification: newNotification
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "An error occurred, please try again!"
        });
    }
});

alooRouter.delete('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOneAndDelete({ orderId });

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        return res.status(200).json({ msg: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ msg: 'An error occurred, please try again' });
    }
});

alooRouter.get('/previousorders', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized, try signing in again!"
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const userId = decoded.userId;
        const previousOrders = await Order.find({ userId });

        return res.status(200).json({
            msg: "Your previous orders",
            previousOrders: previousOrders
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "An error occurred, please try again!"
        });
    }
});

alooRouter.put('/updateorder', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized, try signing in again!"
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const userId = decoded.userId;
        const { orderId, orderQuantity } = req.body;

        if (!orderId || !orderQuantity) {
            return res.status(400).json({
                msg: "Invalid request, orderId and orderQuantity are required!"
            });
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, userId: userId }, // Match the orderId and userId to ensure the user owns the order
            { orderQuantity: orderQuantity }, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({
                msg: "Order not found or user unauthorized to update this order!"
            });
        }

        res.json({
            msg: "Order updated successfully!",
            order: updatedOrder
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "An error occurred, please try again!"
        });
    }
});




module.exports=alooRouter