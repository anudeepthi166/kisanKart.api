'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const [adminRole] = await queryInterface.sequelize.query(
      "SELECT id FROM `Roles` WHERE name = 'Admin' LIMIT 1;"
    );

    const hashedPassword = await bcrypt.hash('admin123', 10); 

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Anu',
        email: 'anu@admin.com',
        password: hashedPassword,
        contact: '9999999999',
        roleId: adminRole[0]?.id, 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});
  }
};
