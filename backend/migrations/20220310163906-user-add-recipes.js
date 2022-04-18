'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'recipes', {type: Sequelize.STRING});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('user', 'recipes');
  }
};
