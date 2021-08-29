module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        "users",
        {
            id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
            username: DataTypes.STRING,
            phone: DataTypes.STRING,
            country: DataTypes.STRING,
            city: DataTypes.STRING,
            photo: DataTypes.STRING,
            passcode: DataTypes.STRING,
            birthday: DataTypes.DATE,
            stadium_id: DataTypes.UUID,
        },
        { underscored: true }
    );

    users.associate = (models) => {
        users.belongsTo(models.stadiums);
    };

    return users;
};
