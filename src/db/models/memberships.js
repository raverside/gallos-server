module.exports = (sequelize, DataTypes) => {
    const memberships = sequelize.define(
        "memberships",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING,
            type: DataTypes.STRING,
            duration: DataTypes.STRING,
            price: DataTypes.INTEGER,
        },
        { underscored: true }
    );

    return memberships;
};
