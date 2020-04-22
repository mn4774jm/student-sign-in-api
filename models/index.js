let Sequelize = require('sequelize');

// defines whether you are working in development or production
let env = process.env.NODE_ENV || 'development';

// fetches code from config.json
let config = require(__dirname + '/../config.json')[env];

let db = {};

let sequelize;

if (config.use_env_variable) {
    // heroku settings set-up
    sequelize = new sequelize(process.env[config.use_env_variable], config)
} else {
    // local development set-up
    sequelize = new Sequelize(config)
}

// read in model info from tudent.js
const model = sequelize['import']('./student.js')
db[model.name] =model;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;