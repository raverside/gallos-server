'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('participants', 'stadium_name', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('participants', 'stadium_name');
  }
};
