'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'blocked', { type: Sequelize.BOOLEAN, defaultValue: false});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'blocked');
  }
};
