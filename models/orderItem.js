'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'OrderItems'
  });

  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return OrderItem;
};
