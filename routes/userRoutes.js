const express = require("express");
const { addUserAddress, getUserAddress, updateUserAddress} = require("../controllers/userController");
const router = express.Router();

router.post('/address', addUserAddress)
router.get('/address/:userId', getUserAddress)
router.put('/address/:userId', updateUserAddress)

module.exports = router;