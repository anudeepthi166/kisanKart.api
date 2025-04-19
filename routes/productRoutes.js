const express = require("express");
const router = express.Router();
const {addProduct, deleteProduct, getAllProducts, updateProduct, getProductById} = require("../controllers/productController");
const upload = require("../utils/multer");

router.post('/', upload.single('image'),addProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductById)
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


module.exports = router;