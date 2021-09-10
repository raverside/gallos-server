module.exports = (sequelize, DataTypes) => {
    const geo_countries = sequelize.define(
        "geo_countries",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: DataTypes.STRING},
            code: {type: DataTypes.STRING},
            currency: {type: DataTypes.STRING},
            timezones: {type: DataTypes.STRING},
            location: {type: DataTypes.STRING},
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },
        { underscored: true }
    );

    geo_countries.associate = (models) => {
        geo_countries.hasMany(models.geo_states, {sourceKey: "id", foreignKey: "country_id"});
        geo_countries.hasMany(models.geo_cities, {sourceKey: "id", foreignKey: "country_id"});
    };

    return geo_countries;
};
