'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('events', 'phase', { type: Sequelize.STRING, defaultValue: "receiving" });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('events', 'phase');
  }
};
