'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    category: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    tableName: 'Products'
  });

  // If you want to define associations in future:
  Product.associate = function(models) {
    // associations can be defined here
    // Product.hasMany(models.CartItem);
    // Product.hasMany(models.OrderItem);
  };

  return Product;
};
