module.exports = (sequelize, DataTypes) => {
    const stadiums = sequelize.define(
        "stadiums",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING,
            representative_name: DataTypes.STRING,
            phone: DataTypes.STRING,
            country: DataTypes.INTEGER,
            state: DataTypes.INTEGER,
            city: DataTypes.INTEGER,
            image: DataTypes.STRING,
            logo: DataTypes.STRING,
            bio: DataTypes.STRING,
        },
        { underscored: true }
    );

    stadiums.associate = (models) => {
        stadiums.hasMany(models.events);
        stadiums.hasMany(models.users);
        stadiums.belongsTo(models.geo_countries, {as: 'countries', targetKey: "id", foreignKey: "country"});
        stadiums.belongsTo(models.geo_states, {as: 'states', targetKey: "id", foreignKey: "state"});
        stadiums.belongsTo(models.geo_cities, {as: 'cities', targetKey: "id", foreignKey: "city"});
    };

    return stadiums;
};
