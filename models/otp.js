'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OTP.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  OTP.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"Users",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'OTP',
    tableName: 'otps',
    timestamps: true
  });

  return OTP;
};