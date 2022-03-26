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
    name: DataTypes.STRING, //Same as title
    time: DataTypes.INTEGER,//Time field - stored in minutes
    tags: DataTypes.STRING(1024),//Tags field - List of strings that will be the tag
    instructions: DataTypes.TEXT, //Same as directions
    equipment: DataTypes.STRING, //List of id's - will be fetched in the front end
    ingredients: DataTypes.TEXT, //List of jsons - each json will contain an id of the ingredient, quantity, and the unit
    //servings: DataTypes.STRING, //Remove
    details: DataTypes.TEXT, //Same as description field
    author: DataTypes.INTEGER, //id of recipe owner
    ratings: DataTypes.STRING //List of id's - reviews will be fetched and appended when recipes are returned
  }, {
    sequelize,
    modelName: 'recipe',
    freezeTableName: true,
    timestamps: false
  });
  return recipe;
};