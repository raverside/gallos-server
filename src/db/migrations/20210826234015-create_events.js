'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      is_special: Sequelize.BOOLEAN,
      image: Sequelize.STRING,
      currency: Sequelize.STRING,
      event_date: Sequelize.DATEONLY,
      receiving_time_start: Sequelize.STRING,
      receiving_time_end: Sequelize.STRING,
      first_race_time: Sequelize.STRING,
      bronze: Sequelize.INTEGER,
      silver_one: Sequelize.INTEGER,
      silver_two: Sequelize.INTEGER,
      gold_one: Sequelize.INTEGER,
      gold_two: Sequelize.INTEGER,
      stadium_id: Sequelize.UUID,
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
    await queryInterface.dropTable('events');
  }
};
