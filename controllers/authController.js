const {User, OTP} = require('../models')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const {Op} = require('sequelize')
const { verifyOTP } = require('./otpController')

exports.signup = asyncHandler(async(req, res) =>{
    console.log("req.body", req.body)
    const {name, email, password, contact} = req.body.values;
    const user = await User.create({name,email,password,contact})
    res.status(200).json({
        message: "User registered successfully",
        user: user
    })
})
exports.login = asyncHandler(async (req, res) => {
    const { contact, password, otp } = req.body.values;

    if (!contact) {
        return res.status(400).json({ message: "Contact is required" });
    }

    const user = await User.findOne({ where: { contact } });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
    } else if (otp) {
        const verificationResult = await verifyOTP(user.id, otp);
        if (verificationResult !== 'OTP verified successfully') {
            return res.status(401).json({ message: verificationResult });
        }
    } else {
        return res.status(400).json({ message: "Provide either password or otp" });
    }

    res.status(200).json({
        message: "User logged in successfully",
        user: user
    });
});
