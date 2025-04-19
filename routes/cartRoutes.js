const express = require("express");
const router = express.Router();
const { addToCart, clearCart, deleteCartItem, getCart, updateCartItem} = require('../controllers/cartController')

router.post('/', addToCart)
router.get('/user/:userId', getCart)
router.put('/itemId/:itemId', updateCartItem)
router.delete('/cartItem/user/:userId/product/:productId', deleteCartItem)
router.delete('/clear/user/:userId', clearCart)

module.exports = router;
