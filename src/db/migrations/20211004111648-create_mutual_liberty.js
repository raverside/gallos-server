'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mutual_liberty', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      owner_id: {
        type: Sequelize.UUID,
        references: { model: 'team_owners', key: 'id' }
      },
      opponent_id: {
        type: Sequelize.UUID,
        references: { model: 'team_owners', key: 'id' }
      },
      reason: Sequelize.STRING,
      active: {type: Sequelize.BOOLEAN, defaultValue: false},
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
    await queryInterface.dropTable('mutual_liberty');
  }
};
