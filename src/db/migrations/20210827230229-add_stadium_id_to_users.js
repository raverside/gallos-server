'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'stadium_id', { type: Sequelize.UUID, references: {model: 'stadiums', key: 'id'} });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'stadium_id');
  }
};
