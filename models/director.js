const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Director = sequelize.define(
    "directors",
    {
      id_director: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isAlpha: true,
        },
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isAlpha: true,
        },
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
        },
      },
      birth: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
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
  return Director;
};
