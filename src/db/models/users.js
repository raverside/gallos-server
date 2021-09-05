module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        "users",
        {
            id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
            username: {type: DataTypes.STRING, unique: true},
            phone: DataTypes.STRING,
            country: DataTypes.STRING,
            city: DataTypes.STRING,
            photo: DataTypes.STRING,
            passcode: DataTypes.STRING,
            birthday: DataTypes.DATE,
            stadium_id: DataTypes.UUID,
            role: DataTypes.STRING,
            labels: DataTypes.TEXT,
            last_login: DataTypes.DATE,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },
        { underscored: true }
    );

    users.associate = (models) => {
        users.belongsTo(models.stadiums);
        users.hasMany(models.users_notes, {as: 'user_notes', sourceKey: "id", foreignKey: "user_id"});
        users.hasMany(models.users_notes, {as: 'creator_notes', sourceKey: "id", foreignKey: "creator_id"});
    };

    return users;
};
