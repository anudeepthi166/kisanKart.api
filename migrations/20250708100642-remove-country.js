'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Addresses', 'country');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Addresses', 'country', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
