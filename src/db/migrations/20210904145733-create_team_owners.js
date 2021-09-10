'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('team_owners', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      name: Sequelize.STRING,
      citizen_id: Sequelize.STRING,
      phone: Sequelize.STRING,
      country: {
        type: Sequelize.INTEGER,
        references: { model: 'geo_countries', key: 'id' }
      },
      state: {
        type: Sequelize.INTEGER,
        references: { model: 'geo_states', key: 'id' }
      },
      city: {
        type: Sequelize.INTEGER,
        references: { model: 'geo_cities', key: 'id' }
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
    await queryInterface.dropTable('team_owners');
  }
};
