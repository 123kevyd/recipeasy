'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    username: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    equipment: DataTypes.STRING,
    restrictions: DataTypes.STRING,
    recipes: DataTypes.STRING
  }, {
    sequelize,
	  timestamps: false,
    modelName: 'user',
    freezeTableName:  true
  });
  return User;
};
