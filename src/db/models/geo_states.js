module.exports = (sequelize, DataTypes) => {
    const geo_states = sequelize.define(
        "geo_states",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: DataTypes.STRING},
            country_id: {type: DataTypes.INTEGER},
            location: {type: DataTypes.STRING},
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },
        { underscored: true }
    );

    geo_states.associate = (models) => {
        geo_states.belongsTo(models.geo_countries, {targetKey: "id", foreignKey: "country_id"});
        geo_states.hasMany(models.geo_cities, {sourceKey: "id", foreignKey: "state_id"});
    };

    return geo_states;
};
