const {User, OTP, Role} = require('../models')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const {Op} = require('sequelize')
const { verifyOTP } = require('./otpController')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// Signup
exports.signup = asyncHandler(async (req, res) => {
    const { name, email, password, contact } = req.body;
    try{
        const userRole = await Role.findOne({ where: { name: 'User' } });
        if (!userRole) {
            return res.status(500).json({ message: "User role not found in the system" });
        }
        let user = await User.create({
            name,
            email,
            password,
            contact,
            roleId: userRole.id 
        });

        user = await User.findOne({
            where: { id: user.id },
            include: [
                { model: Role, as: 'Role', attributes: ['name'] } 
            ]
        });

        user = user.get({ plain: true });
        delete user.password;

        res.status(200).json({
            message: "User registered successfully",
            user: user
        });
    }
    catch(err){
        res.status(500).json({
            message: "Error while creating your account",
        });
    }
});

// Login
exports.login = asyncHandler(async (req, res) => {
    const { contact, password, otp } = req.body;
    try{
        if (!contact) {
            return res.status(400).json({ message: "Contact is required" });
        }

        let user = await User.findOne({ 
            where: { contact },
            include: ['Role'] 
        });

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

        user = user.get({ plain: true });
        delete user.password;

        //Generate a JWT token
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                role: user.Role?.name || null, 
                contact: user.contact
            },
            JWT_SECRET,
            { expiresIn: '1d' } 
        );

        res.status(200).json({
            message: "User logged in successfully",
            token: token,
            user: user
        });
    }
    catch(err){
        res.status(500).json({
            message: "Error while login",
        });
    }
});

