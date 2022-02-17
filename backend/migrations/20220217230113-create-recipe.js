'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      instructions: {
        type: Sequelize.STRING
      },
      equipment: {
        type: Sequelize.ARRAY
      },
      ingredients: {
        type: Sequelize.ARRAY
      },
      servings: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.INTEGER
      },
      ratings: {
        type: Sequelize.ARRAY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipes');
  }
};