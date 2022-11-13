const { Sequelize } = require("sequelize");
require("dotenv").config();
const config = require("./config");

const actorModel = require("../models/actor");
const directorModel = require("../models/director");
const genreModel = require("../models/genre");
const movieModel = require("../models/movie");
const castModel = require("../models/cast");
const userModel = require("../models/user");

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  logging: false,
});

const models = [actorModel, directorModel, genreModel, movieModel, castModel, userModel];

models.forEach((model) => model(sequelize));

const { actors, directors, genres, movies, casts, users } = sequelize.models;

movies.belongsTo(directors, { foreignKey: "fk_id_director"});
movies.belongsTo(genres, { foreignKey: "fk_id_genre"});
genres.hasMany(movies, { foreignKey: "fk_id_genre"});
directors.hasMany(movies, { foreignKey: "fk_id_director"});

actors.hasMany(casts, { foreignKey: "fk_id_actor"});
movies.hasMany(casts, { foreignKey: "fk_id_movie"});
casts.belongsTo(actors, { foreignKey: "fk_id_actor"});
casts.belongsTo(movies, { foreignKey: "fk_id_movie"});


module.exports = sequelize;

