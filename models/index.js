const fs = require("fs");
const Sequelize = require("sequelize");
const config = require("../config/config.json");
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = require("./User");

db.User.init(sequelize);

module.exports = db;
