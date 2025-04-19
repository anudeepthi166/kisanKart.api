const express = require("express");
const router = express.Router();
const { addToCart, clearCart, deleteCartItem, getCart, updateCartItem} = require('../controllers/cartController')
router.get('/:userId', getCart)
router.post('/add', addToCart)
router.put('/update/:itemId', updateCartItem)
router.delete('/delete/cartItem', deleteCartItem)
router.delete('/clear/user/:userId', clearCart)

module.exports = router;
