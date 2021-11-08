'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users', {
      fields: ['phone'],
      type: 'unique',
      name: 'unique_users_phone'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('users', 'unique_users_phone', {
      fields: ['phone'],
      type: 'unique',
      name: 'unique_users_phone'
    });
  }
};
