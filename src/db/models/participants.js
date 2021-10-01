module.exports = (sequelize, DataTypes) => {
    const participants = sequelize.define(
        "participants",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            cage: DataTypes.INTEGER,
            image: DataTypes.STRING,
            image_flipped: DataTypes.BOOLEAN,
            betting_pref: DataTypes.STRING,
            betting_amount: DataTypes.STRING,
            owner_account_number: DataTypes.INTEGER,
            type: DataTypes.STRING,
            event_id: DataTypes.UUID,
            team_id: DataTypes.UUID,
            stadium_id: DataTypes.UUID,
            color: DataTypes.STRING,
            cresta: DataTypes.STRING,
            alas: DataTypes.STRING,
            pata: DataTypes.STRING,
            breeder_id: DataTypes.INTEGER,
            breeder_name: DataTypes.STRING,
            weight: DataTypes.STRING,
            participated_before: DataTypes.BOOLEAN,
            physical_advantage: DataTypes.STRING,
            status: DataTypes.STRING,
            reason: DataTypes.STRING,
        },
        { underscored: true }
    );

    participants.associate = (models) => {
        participants.belongsTo(models.events);
        participants.belongsTo(models.stadiums);
        participants.belongsTo(models.teams);
        participants.hasMany(models.matches, {as: 'participant', sourceKey: "id", foreignKey: "participant_id"});
        participants.hasMany(models.matches, {as: 'opponent', sourceKey: "id", foreignKey: "opponent_id"});
    };

    return participants;
};
