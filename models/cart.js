'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Carts'
  });

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { foreignKey: 'userId' });
    Cart.hasMany(models.CartItem, { foreignKey: 'cartId' });  // later for cart items
  };

  return Cart;
};
