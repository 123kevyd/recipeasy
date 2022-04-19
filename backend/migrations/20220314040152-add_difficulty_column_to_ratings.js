'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('rating', 'difficulty', {type: Sequelize.INTEGER});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('rating', 'diffculty');
  }
};
