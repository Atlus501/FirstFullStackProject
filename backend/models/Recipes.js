module.exports = (sequelize, DataTypes) => {
    const Recipes = sequelize.define("Recipes",{
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        body:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
    );
    return Recipes;
};