'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('events', 'type', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('events', 'type');
  }
};
