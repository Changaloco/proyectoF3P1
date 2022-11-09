const { DataTypes } = require("sequelize");

module.exports = (sequelize) => sequelize.define("placas", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numPlaca: { type: DataTypes.STRING(10), allowNull: false },
    activa: { type: DataTypes.BOOLEAN, allowNull: false },
    fechaAlta: { type: DataTypes.DATE(6), allowNull: false },
    entidad_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "entidades",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
});