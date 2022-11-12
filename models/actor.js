const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Actor = sequelize.define(
    "actors",
    {
      id_actor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          allowNull: false,
          notEmpty: true,
          isAlpha: true,
        },
      },
      surname: {
        type: DataTypes.STRING,
        validate: {
          allowNull: false,
          notEmpty: true,
          isAlpha: true,
        },
      },
      country: {
        type: DataTypes.STRING,
        validate: {
          allowNull: false,
          notEmpty: true,
          isAlpha: true,
        },
      },
      birth: {
        type: DataTypes.DATE,
        validate: {
          allowNull: false,
          isDate: true,
        },
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        validate: {
          allowNull: false,
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      hooks: {
        beforeCreate: (director) => {
          director.createdAt = new Date();
          director.updatedAt = new Date();
        },
        beforeUpdate: function (director, options) {
          director.updatedAt = new Date();
        },
      },
    }
  );
  return Actor;
};
