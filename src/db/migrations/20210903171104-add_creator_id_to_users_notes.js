'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users_notes', 'creator_id', { type: Sequelize.UUID, references: {model: 'users', key:'id'}});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users_notes', 'creator_id');
  }
};
