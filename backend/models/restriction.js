'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restriction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
			this.belongsToMany(models.User, { through: 'User_Restriction' })
    }
  }
  Restriction.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'restriction',
  });
  return Restriction;
};
