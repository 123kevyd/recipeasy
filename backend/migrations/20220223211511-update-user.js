'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'ingredients', {type: Sequelize.STRING});
    await queryInterface.addColumn('user', 'equipment', {type: Sequelize.STRING});
    await queryInterface.addColumn('user', 'restrictions', {type: Sequelize.STRING});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'ingredients');
    await queryInterface.removeColumn('user', 'equipment');
    await queryInterface.removeColumn('user', 'restrictions');
  }
};
