'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; //Choose the env to launch the server
//Select upon the 3 default configs in the .json file
const config = require('../../config/config.json')[env];
const db = {};

let sequelize;
//Init the server with env param or the default in the config file
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model; //Import and add every model inside the model dir.
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    //Make the association needed (hasMany, etc)
    db[modelName].associate(db); //Pass the model array, choose the needed
  }
});

db.Note.sync();
db.User.sync();

db.sequelize = sequelize;
//Add the sequelize var and export to the array
db.Sequelize = Sequelize;
module.exports = db; //Make the array the default exprot
