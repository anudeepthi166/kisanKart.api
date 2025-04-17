const { generateOTP } = require('../controllers/otpController')

const router = require('express').Router()

router.post('/generateOtp', generateOTP)

module.exports = router