const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Genre = sequelize.define('genres', {
        id_genre: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: {
        type: DataTypes.STRING,
        validate: {
            allowNull: false,
            notEmpty: true,
        }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        hooks: {
        beforeCreate: (genre) => {
            genre.createdAt = new Date();
            genre.updatedAt = new Date();
        },
        beforeUpdate: function (genre, options) {
            genre.updatedAt = new Date();
        }
        },
    });
    return Genre;
};