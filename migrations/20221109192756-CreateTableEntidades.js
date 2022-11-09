'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("entidades", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      clave: { type: Sequelize.STRING(3), allowNull: false, isAlpha: true },
      nombre: { type: Sequelize.STRING(40), allowNull: false },
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("entidades");
  }
};
