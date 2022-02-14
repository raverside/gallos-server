module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        "users",
        {
            id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
            username: {type: DataTypes.STRING, unique: true},
            phone: DataTypes.STRING,
            country: DataTypes.INTEGER,
            state: DataTypes.INTEGER,
            city: DataTypes.INTEGER,
            photo: DataTypes.STRING,
            passcode: DataTypes.STRING,
            birthday: DataTypes.DATE,
            stadium_id: DataTypes.UUID,
            role: DataTypes.STRING,
            labels: DataTypes.TEXT,
            last_login: DataTypes.DATE,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            blocked: DataTypes.BOOLEAN
        },
        { underscored: true }
    );

    users.associate = (models) => {
        users.belongsTo(models.stadiums);
        users.belongsTo(models.geo_countries, {as: 'countries', targetKey: "id", foreignKey: "country"});
        users.belongsTo(models.geo_states, {as: 'states', targetKey: "id", foreignKey: "state"});
        users.belongsTo(models.geo_cities, {as: 'cities', targetKey: "id", foreignKey: "city"});
        users.hasMany(models.users_notes, {as: 'user_notes', sourceKey: "id", foreignKey: "user_id", onDelete: "cascade"});
        users.hasMany(models.users_notes, {as: 'creator_notes', sourceKey: "id", foreignKey: "creator_id", onDelete: "cascade"});
    };

    return users;
};
