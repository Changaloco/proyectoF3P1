"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("placas", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      numPlaca: { type: Sequelize.STRING(10), allowNull: false },
      activa: { type: Sequelize.BOOLEAN, allowNull: false },
      fechaAlta: { type: Sequelize.DATE(6), allowNull: false },
      entidad_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "entidades",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("placas");
  },
};
