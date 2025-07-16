const asyncHandler = require('express-async-handler')
const {Order, OrderItem, Product} = require('../models')

exports.getUserOrders = asyncHandler(async(req, res)=> {
    const { userId } = req.params; 

    try{
        if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

        const orders = await Order.findAll({
            where: { userId },
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Product 
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']] 
        });

        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({
            message: "Error while gettong user orders",
        });
    }
})

exports.getOrder = asyncHandler(async(req, res)=> {
    const { orderId } = req.params; // assuming you send userId as a URL parameter

    try{
        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const orders = await Order.findAll({
            where: { id: orderId },
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Product, // if you want to show product details
                            attributes: ['id', 'name', 'price'] // pick what you want
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']] // latest orders first
        });

        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({
            message: "Error while getting order details",
        });
    }
})

exports.createOrder = asyncHandler(async(req, res)=> {
    const { userId, items, totalAmount } = req.body; 
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Invalid order data' });
    }

    const transaction = await Order.sequelize.transaction();

    try {
        const order = await Order.create({
            userId,
            totalAmount,
            status: 'Ordered' 
        }, { transaction });

        const orderItemsData = items.map(item => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }));

        await OrderItem.bulkCreate(orderItemsData, { transaction });

        await transaction.commit();

        res.status(201).json({ message: 'Order created successfully', orderId: order.id });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
});

exports.updateOrder = asyncHandler(async (req, res) => {
    console.log('updateOrder');
    const { orderId } = req.params;
    const { status } = req.body; 
    try{
        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (status) order.status = status;

        await order.save();

        res.status(200).json({ message: 'Order updated successfully', order });
    }catch(err){
        res.status(500).json({
            message: "Error while updaing oder details",
        });
    }
});