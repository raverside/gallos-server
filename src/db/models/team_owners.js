module.exports = (sequelize, DataTypes) => {
    const team_owners = sequelize.define(
        "team_owners",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING,
            citizen_id: DataTypes.STRING,
            phone: DataTypes.STRING,
            country: DataTypes.INTEGER,
            state: DataTypes.INTEGER,
            city: DataTypes.INTEGER,
            digital_id: DataTypes.INTEGER,
        },
        { underscored: true }
    );

    team_owners.associate = (models) => {
        team_owners.belongsTo(models.geo_countries, {as: 'countries', targetKey: "id", foreignKey: "country"});
        team_owners.belongsTo(models.geo_states, {as: 'states', targetKey: "id", foreignKey: "state"});
        team_owners.belongsTo(models.geo_cities, {as: 'cities', targetKey: "id", foreignKey: "city"});
        team_owners.hasMany(models.teams);
        team_owners.hasMany(models.team_owners_notes, {sourceKey: "id", foreignKey: "team_owner_id"});
    };

    return team_owners;
};
