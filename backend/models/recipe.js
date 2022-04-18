'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {}
  Recipe.init({
    name: DataTypes.STRING,
    time: DataTypes.INTEGER,
    tags: DataTypes.STRING(1024),
    instructions: DataTypes.TEXT,
    equipment: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    details: DataTypes.TEXT,
    author: DataTypes.INTEGER,
    ratings: DataTypes.TEXT 
  }, {
    sequelize,
    modelName: 'recipe',
    freezeTableName: true
  });
  return Recipe;
};