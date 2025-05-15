module.exports = (sequelize, DataTypes) => {
    const Recipes = sequelize.define("Recipes",{
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        body:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        totalRating:{
            type: DataTypes.INTEGER,
        },
        
        numRating:{
            type: DataTypes.INTEGER,
        }
    });

    Recipes.associate = (models)=>{
        Recipes.hasMany(models.Ratings, {
            onDelete: "cascade",

            foreignKey: {
                name: "recipeId",
                type: DataTypes.INTEGER,
            },
        });
    }

    return Recipes;
};