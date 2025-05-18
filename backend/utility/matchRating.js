const {Ratings} = require('../models');
const {fn, col} = require('sequelize');

//utility method for adding the ratings of the recipes into the recipes
const matchRating = async(recipes) => {

    try{
        if(!recipes || recipes.length === 0)
            return [];

        const rec = recipes.map(recipe => recipe.id);

        const avgRatings = await Ratings.findAll({
            where: {recipeId: rec},
            attributes: ["recipeId", [fn("AVG", col("value")), "average_rating"]],
            raw: true, //this is to ensure that we get the raw objects and not sequelize instants
        });

        let result;

        try{
            result = recipes.map(recipe => ({
                ...recipe.toJSON(),
                averageRating: avgRatings.find(r => r.recipeId === recipe.id)?.average_rating 
                ? (avgRatings.find(r => r.recipeId === recipe.id).average_rating).toFixed(2) + "/5.0" : "Not Rated"
                })
            );
        }catch(error){
            result = recipes.map(recipe => ({
            ...recipe,
            averageRating: avgRatings.find(r => r.recipeId === recipe.id)?.average_rating 
            ? (avgRatings.find(r => r.recipeId === recipe.id).average_rating).toFixed(2) + "/5.0" : "Not Rated"
            })
            );
        }

        return result;

}catch(error){
    console.log("Error! " +error);
    return recipes.map(recipe => ({
        ...recipe,
        averageRating: "Not Rated",
            })
        );
    }
};

//REST request for matching a single recipe
const matchRatingSingle = async (recipe) => {

    if(!recipe)
        return null;

    try{
        const id = recipe.id;

        const avgRating = await Ratings.findAll({
            where: {recipeId: id,},
            attributes: [[fn("AVG", col("value")), "average_rating"]],
            raw: true,
        });

        const result = {...recipe, averageRating: avgRating?.average_rating 
        ? (avgRating.average_rating).toFixed(2) + "/5.0" : "Not Rated"};

        return result;

    }catch(error){
        console.log("An error has occured! "+error);
        const result = {...recipe, averageRating: "Not Rated"}
    }
}

module.exports= {matchRating, matchRatingSingle}