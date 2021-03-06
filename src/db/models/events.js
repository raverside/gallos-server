module.exports = (sequelize, DataTypes) => {
    const events = sequelize.define(
        "events",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            is_special: DataTypes.BOOLEAN,
            image: DataTypes.STRING,
            currency: DataTypes.STRING,
            event_date: DataTypes.DATE,
            receiving_time_start: DataTypes.STRING,
            receiving_time_end: DataTypes.STRING,
            first_race_time: DataTypes.STRING,
            type: DataTypes.STRING,
            bronze: DataTypes.INTEGER,
            silver_one: DataTypes.INTEGER,
            silver_two: DataTypes.INTEGER,
            gold_one: DataTypes.INTEGER,
            gold_two: DataTypes.INTEGER,
            stadium_id: DataTypes.UUID,
            phase: DataTypes.STRING,
            admin_phase: DataTypes.STRING,
            manual_matching: DataTypes.BOOLEAN
        },
        { underscored: true }
    );

    events.associate = (models) => {
        events.belongsTo(models.stadiums);
        events.hasMany(models.participants, {onDelete: "cascade"});
        events.hasMany(models.matches, {onDelete: "cascade"});
    };

    return events;
};
