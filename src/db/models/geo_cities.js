module.exports = (sequelize, DataTypes) => {
    const geo_cities = sequelize.define(
        "geo_cities",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: DataTypes.STRING},
            country_id: {type: DataTypes.INTEGER},
            state_id: {type: DataTypes.INTEGER},
            location: {type: DataTypes.STRING},
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },
        { underscored: true }
    );

    geo_cities.associate = (models) => {
        geo_cities.belongsTo(models.geo_countries, {targetKey: "id", foreignKey: "country_id"});
        geo_cities.belongsTo(models.geo_states, {sourceKey: "id", foreignKey: "state_id"});
    };

    return geo_cities;
};
