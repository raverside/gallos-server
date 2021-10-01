'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      participant_id: {
        type: Sequelize.UUID,
        references: { model: 'participants', key: 'id' }
      },
      opponent_id: {
        type: Sequelize.UUID,
        references: { model: 'participants', key: 'id' }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
