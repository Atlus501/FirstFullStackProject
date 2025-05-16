module.exports = (sequelize, DataTypes) => {
    const Ratings = sequelize.define("Ratings", {
        value:{
            allowNull: false,
            type: DataTypes.INTEGER,
        },

        comment:{
            type: DataTypes.STRING,
        }
    });

    return Ratings;
}