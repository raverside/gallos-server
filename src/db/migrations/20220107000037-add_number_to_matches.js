'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'number', { type: Sequelize.INTEGER});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('matches', 'number');
  }
};
