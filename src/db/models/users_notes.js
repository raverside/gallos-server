module.exports = (sequelize, DataTypes) => {
    const users_notes = sequelize.define(
        "users_notes",
        {
            id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
            user_id: DataTypes.UUID,
            creator_id: DataTypes.UUID,
            title: DataTypes.STRING,
            note: DataTypes.TEXT,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },
        { underscored: true }
    );

    users_notes.associate = (models) => {
        users_notes.belongsTo(models.users, {as: 'user', targetKey: 'id', foreignKey: 'user_id'});
        users_notes.belongsTo(models.users, {as: 'creator', targetKey: 'id', foreignKey: 'creator_id'});
    };

    return users_notes;
};
