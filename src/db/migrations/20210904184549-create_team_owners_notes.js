'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('team_owners_notes', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      team_owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'team_owners', key: 'id' }
      },
      title: Sequelize.STRING,
      note: Sequelize.TEXT,
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
    await queryInterface.dropTable('team_owners_notes');
  }
};
