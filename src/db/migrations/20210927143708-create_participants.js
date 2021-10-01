'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('participants', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      cage: Sequelize.INTEGER,
      image: Sequelize.STRING,
      betting_pref: Sequelize.STRING,
      betting_amount: Sequelize.STRING,
      owner_account_number: Sequelize.INTEGER,
      type: Sequelize.STRING,
      event_id: {
        type: Sequelize.UUID,
        references: { model: 'events', key: 'id' }
      },
      team_id: {
        type: Sequelize.UUID,
        references: { model: 'teams', key: 'id' }
      },
      stadium_id: {
        type: Sequelize.UUID,
        references: { model: 'stadiums', key: 'id' }
      },
      color: Sequelize.STRING,
      cresta: Sequelize.STRING,
      alas: Sequelize.STRING,
      pata: Sequelize.STRING,
      breeder_id: Sequelize.INTEGER,
      breeder_name: Sequelize.STRING,
      weight: Sequelize.STRING,
      participated_before: Sequelize.BOOLEAN,
      physical_advantage: Sequelize.STRING,
      status: Sequelize.STRING,
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
    await queryInterface.dropTable('participants');
  }
};
