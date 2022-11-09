const { DataTypes } = require("sequelize");

module.exports = (sequelize) => sequelize.define("entidades", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clave: { type: DataTypes.STRING(3), allowNull: false, isAlpha: true },
    nombre: { type: DataTypes.STRING(40), allowNull: false }, 
});