module.exports = (sequelize, DataTypes) => {
    const users_labels = sequelize.define(
        "users_labels",
        {
            id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
            label: DataTypes.STRING,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },
        { underscored: true }
    );

    return users_labels;
};
