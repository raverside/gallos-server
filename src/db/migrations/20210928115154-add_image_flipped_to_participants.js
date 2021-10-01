'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('participants', 'image_flipped', { type: Sequelize.BOOLEAN, defaultValue: false });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('participants', 'image_flipped');
  }
};
