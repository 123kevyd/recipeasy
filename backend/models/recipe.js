'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    instructions: DataTypes.STRING,
    equipment: DataTypes.ARRAY,
    ingredients: DataTypes.ARRAY,
    servings: DataTypes.STRING,
    details: DataTypes.STRING,
    author: DataTypes.INTEGER,
    ratings: DataTypes.ARRAY
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};