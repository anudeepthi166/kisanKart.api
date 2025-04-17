const express = require("express");
const router = express.Router();
const { addToCart, clearCart, deleteCartItem, getCart, updateCartItem} = require('../controllers/cartController')
router.get('/:userId', getCart)
router.add('/add', addToCart)
router.put('update/:itemId', updateCartItem)
router.delete('delete/:itemId', deleteCartItem)
router.delete('clear', clearCart)

module.exports = router;