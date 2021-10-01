'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'live', { type: Sequelize.BOOLEAN });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('matches', 'live');
  }
};
