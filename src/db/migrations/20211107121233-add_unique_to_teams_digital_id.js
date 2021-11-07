'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('teams', {
      fields: ['digital_id'],
      type: 'unique',
      name: 'unique_digital_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('teams', 'unique_digital_id', {
      fields: ['digital_id'],
      type: 'unique',
      name: 'unique_digital_id'
    });
  }
};
