const { DataTypes } = require("sequelize");

module.exports = (sequelize) => sequelize.define("modelos", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(40), allowNull: false },
    marca_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "marcas",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
});
