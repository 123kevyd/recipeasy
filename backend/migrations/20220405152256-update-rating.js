'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('rating', 'review', {type: Sequelize.TEXT});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('rating', 'review', {type: Sequelize.STRING});
  }
};
