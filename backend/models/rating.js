'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {}
  Rating.init({
    review: DataTypes.TEXT,
    difficulty: DataTypes.INTEGER,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rating',
    freezeTableName: true
  });
  return Rating;
};