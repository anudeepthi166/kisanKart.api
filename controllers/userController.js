const { where } = require('sequelize');
const { Address } = require('../models'); // adjust path based on your project structure
const asyncHandler = require('express-async-handler');

exports.addUserAddress = asyncHandler(async (req, res) => {
    try{
      const {
      userId,
      fullName,
      phoneNumber,
      address,
      landmark,
      city,
      state,
      postalCode,
      } = req.body;
    
      // Basic validation
      if (!userId || !fullName || !phoneNumber || !address|| !landmark || !city || !state || !postalCode) {
        return res.status(400).json({ message: 'All required address fields must be provided' });
      }
    
      // Create new address
      const userAddress = await Address.create({
        userId,
        fullName,
        phoneNumber,
        address,
        landmark,
        city,
        state,
        postalCode,
      });
    
      res.status(201).json({
        message: 'Address added successfully',
        userAddress
      });
    }catch(err){
      console.log(err)
      res.status(500).json({
          message: "Error while adding user address",
      });
  }
  });

// Controller to get user's address by userId
exports.getUserAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try{
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const address = await Address.findAll({
      where: { 
        userId: userId,
        isDeleted: false },
    });

    if (address && !address.length) {
      return res.status(404).json({ message: 'Address not found for this user' });
    }

    res.status(200).json({
      message: 'Address fetched successfully',
      address
    });
  }catch(err){
    console.log(err)
    res.status(500).json({
        message: "Error while getting user address",
    });
}
});

exports.updateDeliveryAddress = asyncHandler(async(req, res)=>{
  const {userId, addressId} = req.params
  console.log(userId, addressId)
  try{
    const address = await Address.findAll({
      where:{
        userId
      }
    })
    for(const add of address){
      if(add.id == addressId){
        console.log("matched")
        add.isSelected = true
      }
      else{
        add.isSelected = false
      }
      await add.save()
    } 
    res.status(200).json({
      message: "Updated delivery address"
    }

    )
  }
  catch(err){
    console.log("Error while updating the delivery address", err)
  }
})

exports.updateUserAddress = asyncHandler(async (req, res) => {
  const addressId = req.params.addressId

    console.log(req.body, addressId)
    try{
      const {
      fullName,
      phoneNumber,
      address,
      landmark,
      city,
      state,
      postalCode,
      } = req.body;
    
      // Find the address by ID
      const userAddress = await Address.findOne({where:{
        id: addressId
      }});
      console.log(userAddress)
    
      if (!userAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }
    
      // Update fields
      userAddress.fullName = fullName 
      userAddress.phoneNumber = phoneNumber 
      userAddress.address = address 
      userAddress.landmark = landmark 
      userAddress.city = city 
      userAddress.state = state 
      userAddress.postalCode = postalCode
      console.log(userAddress)
    
      await userAddress.save();
    
      res.status(200).json({
        message: 'Address updated successfully',
        address
      });
    }catch(err){
      console.log(err)
      res.status(500).json({
          message: "Error while updating user address",
      });
  }
  });

exports.deleteUserAddress = asyncHandler(async(req,res)=>{
  try{
   const { addressId } = req.params
   const address = await Address.findOne({where: {id: addressId}})
   address.isDeleted = true
   await address.save()
    res.status(200).json({
      message: "Address deleted"
    })
  }
  catch(err){
    console.log("Error while deleting address", err)
  }
})
