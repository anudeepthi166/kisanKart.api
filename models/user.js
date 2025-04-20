'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order);
      User.belongsTo(models.Role); 
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg:"Name is required"},
        notEmpty:{msg: "Name must not be empty"}
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull: true
    }, 
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: { msg: "Password is required"},
        len:{
          args: [4, 20],
          msg: "Pawword must be at least 4 characters"
        }
      }
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notNull: { msg: "Contact number is required" },
        isNumeric: { msg: "Contact must be a number" },
        len:{
          args: [10, 10],
          msg: "Contact number should contain 10 digits"
        }
      }
    },
    roleId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate:{
        notNull: { msg: "role is required" },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks:{
      beforeCreate: async(user)=>{
        if(user.password){
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      }
    }
  });
  return User;
};