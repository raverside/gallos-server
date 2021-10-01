'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('participants', 'reason', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('participants', 'reason');
  }
};
