const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("roles", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(30), allowNull: false },
    apPaterno: { type: DataTypes.STRING(40), allowNull: false },
    apMaterno: { type: DataTypes.STRING(40), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, isEmail: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
  });
