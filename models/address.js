'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isSelected: {
      type: DataTypes.BOOLEAN,
      allowNull: false  ,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false  ,
      defaultValue: false,
    },
   
  }, {
    tableName: 'Addresses'
  });

  Address.associate = function(models) {
    Address.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Address;
};
