const express = require('express')
const router = express.Router()
const { createOrder, getOrder, getUserOrders, updateOrder} = require('../controllers/orderController')

router.get('/user/:userId', getUserOrders)
router.get(':orderId', getOrder)
router.post('/add', createOrder)
router.put('/update/:orderId', updateOrder)


module.exports = router;