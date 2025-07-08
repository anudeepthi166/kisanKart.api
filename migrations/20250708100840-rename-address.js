'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Addresses', 'addressLine1', 'address');
    await queryInterface.renameColumn('Addresses', 'addressLine2', 'landmark');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Addresses', 'address', 'addressLine1');
    await queryInterface.renameColumn('Addresses', 'landmark', 'addressLine2');
  }
};
