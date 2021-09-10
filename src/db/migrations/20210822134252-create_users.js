'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true
            },
            username: Sequelize.STRING,
            phone: Sequelize.STRING,
            country: {
                type: Sequelize.INTEGER,
                references: { model: 'geo_countries', key: 'id' }
            },
            state: {
                type: Sequelize.INTEGER,
                references: { model: 'geo_states', key: 'id' }
            },
            city: {
                type: Sequelize.INTEGER,
                references: { model: 'geo_cities', key: 'id' }
            },
            photo: Sequelize.STRING,
            passcode: Sequelize.STRING,
            birthday: Sequelize.DATE,
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
        await queryInterface.dropTable('users');
    }
};
