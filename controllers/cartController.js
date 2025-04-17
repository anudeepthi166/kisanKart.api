const asyncHandler = require('express-async-handler')
exports.getCart = asyncHandler(()=>{
    console.log('getCart')
})
exports.addToCart = asyncHandler(()=>{
    console.log('addToCart')
})
exports.updateCartItem = asyncHandler(()=>{
    console.log('updateCartItem')
})
exports.deleteCartItem = asyncHandler(()=>{    
    console.log('deleteCartItem')
})
exports.clearCart = asyncHandler(()=>{
    console.log('clearCart')
})