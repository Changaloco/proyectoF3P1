'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('casts', {
      id_cast: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fk_id_movie: {
        type: Sequelize.INTEGER,
        references: {
          model: 'movies',
          key: 'id_movie'
        },
        onDelete: 'CASCADE'
      },
      fk_id_actor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'actors',
          key: 'id_actor'
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
     queryInterface.dropTable('casts');
  }
};
