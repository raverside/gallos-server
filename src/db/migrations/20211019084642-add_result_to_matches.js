'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'result', { type: Sequelize.INTEGER, comment: '0 - blue wins, 1 - white wins, 2 - draw, 3 - cancelled' });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('matches', 'result');
  }
};
