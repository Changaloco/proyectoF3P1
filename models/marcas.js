const { DataTypes } = require("sequelize");

module.exports = (sequelize) => sequelize.define("marcas", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clave: { type: DataTypes.STRING(3), allowNull: false, isAlpha: true },
    descripcion: { type: DataTypes.STRING(40), allowNull: false },
});
