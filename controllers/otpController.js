const asyncHandler = require('express-async-handler')
const {User, OTP} = require('../models')

generate6DigitOtp = () =>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}
exports.generateOTP = asyncHandler(async(req, res)=>{
    const {contact} = req.body;
    if(!contact){
        res.status(400).json({
            message: "Contact number is required"
        })
    }
    const user = User.findOne({where: {contact}})
    if(!user){
        res.status(404).json({
            message: "User not found "
        })
    }
    const otpCode = generate6DigitOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)
    await OTP.create({
        userId: user.id,
        otp: otpCode,
        expiresAt: expiresAt
    })

    res.status(200).json({
        message: "OTP Generated successfully",
        otp: otpCode
    })
})
exports.verifyOTP = (userId, otp) => {
    const latestOtp = OTP.findOne({
        where: {userId},
        order: [['createdAt', 'DESC']]})
    if(!latestOtp){
        return 'No OTP found for this user'
    }
    const now = Date.now()
    if( now > latestOtp.expiresAt){
        return 'OTP expired'
    }
    if(otp != latestOtp.otp){
        return 'Invalid OTP'
    }
    latestOtp.verifiedAt = new Date;
    latestOtp.save()
    return 'OTP verified successfully'
}