'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restriction extends Model {}
  Restriction.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'restriction',
    freezeTableName: true
  });
  return Restriction;
};
