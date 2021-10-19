module.exports = (sequelize, DataTypes) => {
    const matches = sequelize.define(
        "matches",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            participant_id: DataTypes.UUID,
            opponent_id: DataTypes.UUID,
            live: DataTypes.BOOLEAN,
            manual: DataTypes.BOOLEAN,
            event_id: DataTypes.UUID,
            result: DataTypes.INTEGER
        },
        { underscored: true }
    );

    matches.associate = (models) => {
        matches.belongsTo(models.participants, {as: 'participant', targetKey: "id", foreignKey: "participant_id"});
        matches.belongsTo(models.participants, {as: 'opponent', targetKey: "id", foreignKey: "opponent_id"});
        matches.belongsTo(models.events, {targetKey: "id", foreignKey: "event_id"});
    };

    return matches;
};
