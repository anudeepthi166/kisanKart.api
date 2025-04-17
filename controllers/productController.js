const asyncHandler = require("express-async-handler")
exports.getAllProducts = asyncHandler(() =>{
    console.log('getAllProducts')
})
exports.addProduct = asyncHandler(() =>{
    console.log('addProduct')
})
exports.updateProduct = asyncHandler(() =>{
    console.log('updateProduct')
})
exports.deleteProduct = asyncHandler(() =>{
    console.log('deleteProduct')
})