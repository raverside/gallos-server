'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'role', { type: Sequelize.STRING, defaultValue: "user" });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'role');
  }
};
