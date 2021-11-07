'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('team_owners', {
      fields: ['digital_id'],
      type: 'unique',
      name: 'unique_to_digital_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('team_owners', 'unique_to_digital_id', {
      fields: ['digital_id'],
      type: 'unique',
      name: 'unique_to_digital_id'
    });
  }
};
