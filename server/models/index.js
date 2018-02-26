// var fs = require('fs');
// var path = require('path');
// var Sequelize = require('sequelize');
// var config = require('../config/config');
// var db = {};

// var sequelize = new Sequelize(
//   config.db.database,
//   config.db.user,
//   config.db.password,
//   config.db.options
// );

// fs.readdirSync(__dirname)
//   .filter(function(file) {
//     return file !== 'index.js' && file[0] !== '.';
//   })
//   .forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;