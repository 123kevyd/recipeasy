'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('recipe', 'time', {type: Sequelize.INTEGER});
    await queryInterface.addColumn('recipe', 'tags', {type: Sequelize.STRING(1024)})
    await queryInterface.changeColumn('recipe', 'instructions', {type: Sequelize.TEXT})
    await queryInterface.changeColumn('recipe', 'ingredients', {type: Sequelize.TEXT})
    await queryInterface.removeColumn('recipe', 'servings');
    await queryInterface.changeColumn('recipe', 'details', {type: Sequelize.TEXT})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('recipe', 'time');
    await queryInterface.removeColumn('recipe', 'tags');
    await queryInterface.changeColumn('recipe', 'instructions', {type: Sequelize.STRING})
    await queryInterface.changeColumn('recipe', 'ingredients', {type: Sequelize.STRING})
    await queryInterface.addColumn('recipe', 'servings', {type: Sequelize.STRING})
    await queryInterface.changeColumn('recipe', 'details', {type: Sequelize.STRING})
  }
};
