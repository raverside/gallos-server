'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'photo', {
      type: Sequelize.STRING,
      defaultValue: "avatar"
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'photo', {
      type: Sequelize.STRING,
      defaultValue: null
    })
  }
};
