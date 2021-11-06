'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('geo_cities', 'country_id', {
      type: Sequelize.INTEGER,
      references: { model: 'geo_countries', key: 'id' }
    });
    await queryInterface.changeColumn('geo_cities', 'state_id', {
      type: Sequelize.INTEGER,
      references: { model: 'geo_states', key: 'id' }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('geo_cities', 'country_id', {
      type: Sequelize.INTEGER,
      references: {}
    });
    await queryInterface.changeColumn('geo_cities', 'state_id', {
      type: Sequelize.INTEGER,
      references: {}
    })
  }
};
