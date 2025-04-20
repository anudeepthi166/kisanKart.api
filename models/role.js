'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.hasMany(models.User);  // One Role can be assigned to many Users
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Role name is required" },
        notEmpty: { msg: "Role name must not be empty" }
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: true
  });
  return Role;
};
