'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
			this.belongsToMany(models.User, { through: 'User_Equipment' })
    }
  }
  equipment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'equipment',
		timestamps: false,
  });
  return equipment;
};
