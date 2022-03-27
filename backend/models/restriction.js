'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restriction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { through: 'User_Restriction' })
    }
  }
  restriction.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'restriction',
    freezeTableName: true
  });
  return restriction;
};
