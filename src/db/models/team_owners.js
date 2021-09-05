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
            country: DataTypes.STRING,
            state: DataTypes.STRING,
            city: DataTypes.STRING,
        },
        { underscored: true }
    );

    team_owners.associate = (models) => {
        team_owners.hasMany(models.teams);
        team_owners.hasMany(models.team_owners_notes, {sourceKey: "id", foreignKey: "team_owner_id"});
    };

    return team_owners;
};
