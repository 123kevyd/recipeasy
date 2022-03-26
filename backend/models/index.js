'use strict';

var i = 1
console.log(i++)

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
console.log(i++)
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
console.log(i++)

// setting up database connection
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

console.log(i++)
// grabbing our models (tables)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
console.log(i++)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
console.log(i++)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log(i++)
//exporting info
db.equipment = require("/backend/models/equipment.js")(sequelize, Sequelize)
db.rating = require("./rating.js")(sequelize, Sequelize)
db.recipe = require("./recipe.js")(sequelize, Sequelize)
db.ingredient = require("/backend/models/ingredient.js")(sequelize, Sequelize)
db.user = require("./user.js")(sequelize, Sequelize)
console.log(i++)

module.exports = db;
