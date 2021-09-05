'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'labels', { type: Sequelize.TEXT, allowNull: false, defaultValue: "" });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'labels');
  }
};
