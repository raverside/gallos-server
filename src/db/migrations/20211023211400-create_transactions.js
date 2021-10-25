'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' }
      },
      activated_by: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' }
      },
      membership_id: {
        type: Sequelize.UUID,
        references: { model: 'memberships', key: 'id' }
      },
      amount: Sequelize.INTEGER,
      currency: Sequelize.STRING,
      method: Sequelize.STRING,
      notes: Sequelize.TEXT,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};
