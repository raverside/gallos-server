module.exports = (sequelize, DataTypes) => {
    const teams = sequelize.define(
        "teams",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            digital_id: {type: DataTypes.INTEGER, autoIncrement: true},
            name: DataTypes.STRING,
            wins: DataTypes.INTEGER,
            draws: DataTypes.INTEGER,
            loses: DataTypes.INTEGER,
            team_owner_id: DataTypes.UUID,
        },
        { underscored: true }
    );

    teams.associate = (models) => {
        teams.belongsTo(models.team_owners);
    };

    return teams;
};
