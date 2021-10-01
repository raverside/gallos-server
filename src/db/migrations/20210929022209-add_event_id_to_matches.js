'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'event_id', { type: Sequelize.UUID, references: {model: 'events', key: 'id'} });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('matches', 'event_id');
  }
};
