'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {}
  Equipment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'equipment',
  });
  return Equipment;
};
