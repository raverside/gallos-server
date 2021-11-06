'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('geo_states', 'country_id', {
      type: Sequelize.INTEGER,
      references: { model: 'geo_countries', key: 'id' }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('geo_states', 'country_id', {
      type: Sequelize.INTEGER,
      references: {}
    })
  }
};
