'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'color_confirmed', { type: Sequelize.BOOLEAN, defaultValue: false });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('matches', 'color_confirmed');
  }
};
