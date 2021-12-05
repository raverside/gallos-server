'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'match_time', { type: Sequelize.INTEGER});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('matches', 'match_time');
  }
};
