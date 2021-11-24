'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('participants', 'participants_stadium_id_fkey', {});
    await queryInterface.changeColumn('participants', 'stadium_id', {
      type: Sequelize.STRING,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('participants', 'stadium_id', {
      type: Sequelize.UUID,
      references: { model: 'stadiums', key: 'id' }
    })
  }
};
