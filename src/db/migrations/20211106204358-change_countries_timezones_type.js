'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('geo_countries', 'timezones', {
      type: Sequelize.TEXT,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('geo_countries', 'timezones', {
      type: Sequelize.STRING,
    })
  }
};
