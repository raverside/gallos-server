'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('stadiums', 'five_sec', { type: Sequelize.BOOLEAN, defaultValue: true });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('stadiums', 'five_sec');
  }
};
