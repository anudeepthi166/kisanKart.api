'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Roles', // name of Target model
        key: 'id',      // key in Target model
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'roleId');
  }
};
