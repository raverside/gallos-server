'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('teams', 'digital_id', { type: Sequelize.INTEGER, autoIncrement: true });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('teams', 'digital_id');
  }
};
