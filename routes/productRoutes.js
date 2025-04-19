const express = require("express");
const router = express.Router();
const {addProduct, deleteProduct, getAllProducts, updateProduct} = require("../controllers/productController");
const upload = require("../utils/multer");

router.get('/', getAllProducts);
router.post('/add', upload.single('image'),addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);


module.exports = router;