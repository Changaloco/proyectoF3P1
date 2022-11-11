const { Sequelize } = require("sequelize");
require("dotenv").config();
const {development, production} = require("./config");

const sequelize = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  dialect: development.dialect,
  port: development.port,
  logging: false,
});



module.exports = sequelize;
