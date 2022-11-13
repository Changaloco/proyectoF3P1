const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cast = sequelize.define(
    "casts",
    {
      id_cast: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fk_id_movie: {
        type: DataTypes.INTEGER,
        references: {
          model: 'movies',
          key: 'id_movie',
        },
        onDelete: 'CASCADE',
      },
      fk_id_actor: {
        type: DataTypes.INTEGER,
        references: {
          model: 'actors',
          key: 'id_actor',
        },
        onDelete: 'CASCADE',
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      hooks: {
        beforeCreate: (cast) => {
          cast.createdAt = new Date();
          cast.updatedAt = new Date();
        },
        beforeUpdate: function (cast, options) {
          cast.updatedAt = new Date();
        },
      },
    }
  );
  return Cast;
};
