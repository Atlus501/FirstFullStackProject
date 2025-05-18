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

    // return recipes.map(recipe => ({
    //     ...recipe, 
    //     averageRating: avgRatings.find(r => r.recipeId === recipe.id)?.average_rating 
    // ?? "Not Rated",

    // }))

    return recipes.map(recipe => ({
        ...recipe,
        averageRating: avgRatings.find(r => r.recipeId === recipe.id)?.average_rating 
        ? avgRatings.find(r => r.recipeId === recipe.id).average_rating + "/5.0" : "Not Rated"
        })
    );


}catch(error){
    console.log("Error! " +error);
    return recipes.map(recipe => ({
        ...recipe,
        averageRating: "Not Rated",
        })
    );
}
};

module.exports= {matchRating}