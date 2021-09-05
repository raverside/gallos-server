module.exports = (sequelize, DataTypes) => {
    const team_owners_notes = sequelize.define(
        "team_owners_notes",
        {
            id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
            team_owner_id: DataTypes.UUID,
            title: DataTypes.STRING,
            note: DataTypes.TEXT,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },
        { underscored: true }
    );

    team_owners_notes.associate = (models) => {
        team_owners_notes.belongsTo(models.team_owners, { targetKey: 'id', foreignKey: 'team_owner_id'});
    };

    return team_owners_notes;
};
