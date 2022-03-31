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
      //this.belongsToMany(models.user, { through: 'User_Ingredient' })
    }
  }
  recipe.init({
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
  return recipe;
};