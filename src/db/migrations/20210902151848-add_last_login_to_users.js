'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'last_login', { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'last_login');
  }
};
