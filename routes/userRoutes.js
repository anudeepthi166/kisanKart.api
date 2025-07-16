const express = require("express");
const { addUserAddress, getUserAddress, updateUserAddress, updateDeliveryAddress, deleteUserAddress} = require("../controllers/userController");
const router = express.Router();

router.post('/address', addUserAddress)
router.get('/address/:userId', getUserAddress)
router.put('/address/:addressId', updateUserAddress)
router.put('/:userId/address/:addressId', updateDeliveryAddress)
router.delete('/address/:addressId', deleteUserAddress)

module.exports = router;