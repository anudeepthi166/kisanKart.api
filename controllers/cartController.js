const asyncHandler = require('express-async-handler')
const {Cart, CartItem, Product} = require('../models')

// Get user cart items
exports.getCart = asyncHandler(async(req, res)=>{
    try{
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required.' });
        }

        const cart = await Cart.findOne({
            where: { userId },
            include: [{
                model: CartItem,
                include: [Product]
            }]
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user.' });
        }
        console.log(cart)
        res.status(200).json({
            cartId: cart.id,
            userId: cart.userId,
            items: cart.CartItems.map(item => ({
                itemId: item.id,

                product: item.Product, 
                quantity: item.quantity
            }))
        });
    }
    catch(err){
        res.status(500).json({
            message: "Error while getting user cart items",
        });
    }
});

// Add items to cart
exports.addToCart = asyncHandler(async(req, res)=>{
    try{
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'userId, productId, and quantity are required.' });
        }

        let cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await Cart.create({ userId });
        }

        let cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await CartItem.create({
                cartId: cart.id,
                productId: productId,
                quantity: quantity
            });
        }

        res.status(200).json({ message: 'Product added to cart successfully.' });
    }
    catch(err){
        res.status(500).json({
            message: "Error while adding items to cart",
        });
    }
});


// Upadte quantity for cart items
exports.updateCartItem = asyncHandler(async(req, res)=>{
    try{
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'userId, productId, and quantity are required.' });
        }

        const cart = await Cart.findOne({
            where: { userId }
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: 'Cart item updated successfully.' });
    }
    catch(err){
        res.status(500).json({
            message: "Error while updaing cart items",
        });
    }
});

exports.deleteCartItem = asyncHandler(async(req, res)=>{ 
    console.log(req.params)   
    try{
        const { userId, productId } = req.params; 

        if (!userId || !productId) {
            return res.status(400).json({ message: 'userId and productId are required.' });
        }

        const cart = await Cart.findOne({
            where: { userId }
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        await cartItem.destroy();

        res.status(200).json({ message: 'item deleted from the cart successfully.' });
    }
    catch(err){
        res.status(500).json({
            message: "Error while deleting cart items",
        });
    }
});
exports.clearCart = asyncHandler(async(req, res)=>{
    try{
        const { userId } = req.params; 

        if (!userId) {
            return res.status(400).json({ message: 'userId is required.' });
        }

        const cart = await Cart.findOne({
            where: { userId }
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        await CartItem.destroy({
            where: { cartId: cart.id }
        });

        res.status(200).json({ message: 'All items cleared from the cart.' });
    }
    catch(err){
        res.status(500).json({
            message: "Error while clearing user cart",
        });
    }
});
