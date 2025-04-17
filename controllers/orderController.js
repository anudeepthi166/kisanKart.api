const asyncHandler = require('express-async-handler')
exports.getUserOrders = asyncHandler(()=> {
    console.log('getIserOrders')
})
exports.getOrder = asyncHandler(()=> {
    console.log('getOrder')
})
exports.createOrder = asyncHandler(()=> {
    console.log('careteOrder')
})
exports.updateOrder = asyncHandler(()=> {
    console.log('updateOrder')
})