const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Movie = sequelize.define(
    "movies",
    {
      id_movie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            allowNull:false,
            isAlphanumeric: true,
        }
      },
      date: {
        type: DataTypes.DATE,
        validate: {
            allowNull:false,
            isDate: true,
        }
      },
      duration: {
        type: DataTypes.FLOAT,
        validate: {
            allowNull:false,
        }
      },
      plot: {
        type: DataTypes.TEXT,
        validate: {
            allowNull:false,
        }
      },
      poster: {
        type: DataTypes.STRING,
        validate: {
            allowNull:false,
        }
      },
      fk_id_director: {
        type: DataTypes.INTEGER,
        references: {
          model: "directors",
          key: "id_director",
        },
        onDelete: "CASCADE",
      },
      fk_id_genre: {
        type: DataTypes.INTEGER,
        references: {
          model: "genres",
          key: "id_genre",
        },
        onDelete: "CASCADE",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      hooks: {
        beforeCreate: (movie) => {
          movie.createdAt = new Date();
          movie.updatedAt = new Date();
        },
        beforeUpdate: function (movie, options) {
          movie.updatedAt = new Date();
        },
      },
    }
  );
  return Movie;
};
