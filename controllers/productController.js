const asyncHandler = require("express-async-handler")
const {Product, sequelize} = require('../models');
const cloudinary = require('../utils/cloudinary')
const fs = require('fs');
const { type } = require("os");
const { Sequelize } = require("sequelize");

exports.getAllProducts = asyncHandler(async (req, res) => {
  console.log('getAllProducts');
  try {
    const products = await Product.findAll();
    
    // Check for the flag in the request (e.g., req.query or req.body)
    const { category } = req.query; // Assuming the flag is passed as a query parameter
    console.log('category falg', category)
    console.log(products)

    if (category) {
      // Group products by category if the flag is set
      const groupedProducts = products.filter((product)=>product.category.toLowerCase() === category.toLowerCase())
      console.log('grouped', groupedProducts)
      return res.status(200).json({
        products: groupedProducts
      });
    }
    
    // Return all products if no category flag is provided
    return res.status(200).json({
      products: products
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

exports.searchProducts = asyncHandler(async(req,res)=>{
  try{
    const {category, productName} = req.query
    let query = `SELECT * FROM products WHERE 1=1`
    const replacements = {}
    if(category && category!=='null'){
      console.log("category:",  category)
      query += ` AND category like :category `
      replacements.category = `%${category }%`
    }
    if(productName){
      console.log("productName:",  productName)
      query+= ` AND name like :productName`
      replacements.productName = `%${productName}%`
      
    }
    const products =  await sequelize.query(query,{
      replacements,
      type: sequelize.QueryTypes.SELECT
    })
    // console.log(products)
    res.status(200).json({
      messsage:'searched for products',
      toatl: products.length,
      products: products
    })
  }catch(err){
    console.log(`err while getting products based on search`,err)
  }

})

exports.getProductById = asyncHandler(async(req, res)=>{
  console.log('getproductById')
  const {productId} = req.params
  try {
    const products = await Product.findOne({where:{
      id: productId
    }});
    res.status(200).json({
        products: products
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching this product', error: error.message });
    }

})
exports.addProduct = asyncHandler(async(req,res) =>{
    const { name, description, price, stock, category } = req.body;
    console.log(req.body)
    try{
      if (!name || !price || stock === undefined) {
        return res.status(400).json({ message: 'Name, price, and stock are required fields.' });
      }
        //Upload image to cloudinary
        let imageUrl = ''
        if(req.file){
          const res = await  cloudinary.uploader.upload(req.file.path,{
            folder: 'kisanKart_Products'
          })
          imageUrl = res.secure_url
          fs.unlinkSync(req.file.path)
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
  }catch(err){
    res.status(500).json({
        message: "Error while adding this product, please try again",
    });
}
});
exports.updateProduct = asyncHandler(async(req,res) =>{
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;
    try{
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
    }catch(err){
      res.status(500).json({
          message: "Error while updaing product details",
      });
  }
})
exports.deleteProduct = asyncHandler(async(req,res) =>{
    const { id } = req.params;

    try{
      const product = await Product.findByPk(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
    
      await product.destroy();
    
      res.status(200).json({ message: 'Product deleted successfully' });
    }catch(err){
      res.status(500).json({
          message: "Error while deleting product",
      });
  }
})