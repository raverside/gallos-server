'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('stadiums', 'membership', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('stadiums', 'membership');
  }
};
