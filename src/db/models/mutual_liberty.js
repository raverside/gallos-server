module.exports = (sequelize, DataTypes) => {
    const mutual_liberty = sequelize.define(
        "mutual_liberty",
        {
            id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
            owner_id: DataTypes.UUID,
            opponent_id: DataTypes.UUID,
            reason: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },
        { underscored: true, freezeTableName: true, }
    );

    mutual_liberty.associate = (models) => {
        mutual_liberty.belongsTo(models.team_owners, {as: 'owner_liberty', targetKey: "id", foreignKey: "owner_id"});
        mutual_liberty.belongsTo(models.team_owners, {as: 'opponent_liberty', targetKey: "id", foreignKey: "opponent_id"});
    };

    return mutual_liberty;
};
