const express = require("express");
const router = express.Router();
const {addProduct, deleteProduct, getAllProducts, updateProduct, getProductById} = require("../controllers/productController");
const upload = require("../utils/multer");

router.get('/', getAllProducts);
router.get('/:productId', getProductById)
router.post('/add', upload.single('image'),addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);


module.exports = router;