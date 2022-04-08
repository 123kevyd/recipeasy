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
			//this.belongsToMany(models.equipment, { through: 'User_Equipment' })
			//this.belongsToMany(models.ingredient, { through: 'User_Ingredient' })
			//this.belongsToMany(models.recipe, { through: 'User_Recipe' })
			//this.belongsToMany(models.restriction, { through: 'User_Restriction' })
    }
  }
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
    freezeTableName:  true,
    timestamps: false
  });
  return User;
};
