const asyncHandler = require("express-async-handler")
const {Product} = require('../models')
exports.getAllProducts = asyncHandler(async(req,res) =>{
    console.log('getAllProducts')
    try {
        const products = await Product.findAll();
    
        const groupedProducts = {};
    
        products.forEach(product => {
          const category = product.category || 'Uncategorized';
          if (!groupedProducts[category]) {
            groupedProducts[category] = [];
          }
          groupedProducts[category].push(product);
        });
        res.status(200).json({
            products: groupedProducts
          });
        } catch (error) {
          res.status(500).json({ message: 'Error fetching products', error: error.message });
        }
});
exports.addProduct = asyncHandler(async(req,res) =>{
    const { name, description, price, stock, category, imageUrl } = req.body;
    console.log(req.body)
    if (!name || !price || stock === undefined) {
    return res.status(400).json({ message: 'Name, price, and stock are required fields.' });
    }

    const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        imageUrl
    });

    res.status(201).json({
    message: 'Product added successfully',
    product: newProduct
    });
});
exports.updateProduct = asyncHandler(async(req,res) =>{
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
    return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;
    product.imageUrl = imageUrl ?? product.imageUrl;

    await product.save();

    res.status(200).json({
    message: 'Product updated successfully',
    product
    });
})
exports.deleteProduct = asyncHandler(async(req,res) =>{
    const { id } = req.params;

    const product = await Product.findByPk(id);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    await product.destroy();
  
    res.status(200).json({ message: 'Product deleted successfully' });
})