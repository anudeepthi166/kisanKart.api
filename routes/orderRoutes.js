const express = require('express')
const router = express.Router()
const { createOrder, getOrder, getUserOrders, updateOrder} = require('../controllers/orderController')

router.post('/', createOrder)
router.get('/user/:userId', getUserOrders)
router.get('/:orderId', getOrder)
router.put('/:orderId', updateOrder)

module.exports = router;