'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    equipment: DataTypes.STRING,
    restrictions: DataTypes.STRING
  }, {
    sequelize,
	timestamps: false,
    modelName: 'user',
    freezeTableName:  true,
  });
  return User;
};
