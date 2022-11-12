const { Sequelize } = require("sequelize");
require("dotenv").config();
const {development, production} = require("./config");

const actorModel = require("../models/Actor");
const directorModel = require("../models/Director");
const genreModel = require("../models/Genre");
const movieModel = require("../models/Movie");
const castModel = require("../models/Cast");
const userModel = require("../models/User");

const sequelize = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  dialect: development.dialect,
  port: development.port,
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
