'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('team_owners', 'digital_id', { type: Sequelize.INTEGER, autoIncrement: true });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('team_owners', 'digital_id');
  }
};
