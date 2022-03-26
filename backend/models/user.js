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
			console.log("models:")
			console.log(models)
			this.belongsToMany(models.Equipment, { through: 'User_Equipment' })
			this.belongsToMany(models.Ingredient, { through: 'User_Ingredient' })
			this.belongsToMany(models.Recipe, { through: 'User_Recipe' })
			this.belongsToMany(models.Restriction, { through: 'User_Restriction' })
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
    timestamps: false
  });
  return User;
};
