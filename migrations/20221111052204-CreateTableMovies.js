'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      id_movie: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: Sequelize.STRING,
      date: Sequelize.DATE,
      duration: Sequelize.FLOAT,
      plot: Sequelize.TEXT,
      poster: Sequelize.STRING,
      fk_id_director: {
        type: Sequelize.INTEGER,
        references: {
          model: 'directors',
          key: 'id_director'
        },
        onDelete: 'CASCADE'
      },
      fk_id_genre: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genres',
          key: 'id_genre'
        },
        onDelete: 'CASCADE'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     queryInterface.dropTable('movies');
  }
};
