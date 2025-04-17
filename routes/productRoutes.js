const express = require("express");
const router = express.Router();
const {addProduct, deleteProduct, getAllProducts, updateProduct} = require("../controllers/productController")

router.get('/', getAllProducts);
router.post('/add', addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);


module.exports = router;