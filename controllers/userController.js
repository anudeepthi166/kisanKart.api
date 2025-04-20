const { where } = require('sequelize');
const { Address } = require('../models'); // adjust path based on your project structure
const asyncHandler = require('express-async-handler');

exports.addUserAddress = asyncHandler(async (req, res) => {
  console.log(req.body)
    const {
      userId,
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country
    } = req.body;
  
    // Basic validation
    if (!userId || !fullName || !phoneNumber || !addressLine1 || !city || !state || !postalCode) {
      return res.status(400).json({ message: 'All required address fields must be provided' });
    }
  
    // Check if address already exists for this user (optional)
    const existingAddress = await Address.findOne({ where: { userId } });
    if (existingAddress) {
      return res.status(400).json({ message: 'Address already exists for this user' });
    }
  
    // Create new address
    const address = await Address.create({
      userId,
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country: country || 'India' // default to India if not provided
    });
  
    res.status(201).json({
      message: 'Address added successfully',
      address
    });
  });

// Controller to get user's address by userId
exports.getUserAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const address = await Address.findOne({
    where: { userId: userId },
  });

  if (!address) {
    return res.status(404).json({ message: 'Address not found for this user' });
  }

  res.status(200).json({
    message: 'Address fetched successfully',
    address
  });
});

exports.updateUserAddress = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const {
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country
    } = req.body;
  
    // Find the address by ID
    const address = await Address.findOne({where:{
      userId: userId
    }});
  
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
  
    // Update fields
    address.fullName = fullName || address.fullName;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.addressLine1 = addressLine1 || address.addressLine1;
    address.addressLine2 = addressLine2 || address.addressLine2;
    address.city = city || address.city;
    address.state = state || address.state;
    address.postalCode = postalCode || address.postalCode;
    address.country = country || address.country;
  
    await address.save();
  
    res.status(200).json({
      message: 'Address updated successfully',
      address
    });
  });
