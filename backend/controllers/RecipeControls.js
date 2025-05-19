const {Recipes} = require("../models");
const {matchUsername, matchUserSingle} = require("../utility/matchUsername");
const {matchRating, matchRatingSingle} = require('../utility/matchRating')
const {Op} = require('sequelize');

//function for getting 15 recipes
const getRecipes = async (req,res) =>{
    const recipes = await Recipes.findAll({
        limit: 15,
    });

    const recipesWithUsernames = await matchUsername(recipes);
    const finalRecipes = await matchRating(recipesWithUsernames);

    return res.json(finalRecipes);
};

//function gor getting specific recipes
const getSpecRecipes = async (req, res) => {
    const {title} = req.query;

    try{
        const recipes = await Recipes.findAll({
            where:{
                title: {[Op.like]: '%'+title+'%'},
            }
        });

        let result = await matchUsername(recipes);
        result = await matchRating(result);

        return res.json(result);
    }
    catch(error){
        return res.json({error: error});
    }
};

//function for getting user specific recipes
const getUserRecipes = async (req, res) =>{
    const {userId} = req.query;

    try{
        const recipes = await Recipes.findAll({
            where:{authorId: userId},
        });

        const finalRecipes = await matchRating(recipes);

        return res.json(finalRecipes);
    }
    catch(error){
        return res.json({error: error});
    }
};

//function for getting your specific recipes
const getYourSpecRecipe = async (req, res)=>{
    const {authorId, title} = req.query;

    try{
        const recipe = await Recipes.findAll({
            where:{
                authorId: authorId, 
                title: {[Op.like]: '%'+title+'%'}}
        });

        if(!recipe)
            return res.json({error: "This recipe isn't found"});

        let result = await matchUsername(recipe);
        result = await matchRating(result);

        return res.json(result);
    }catch(error){
        return res.json({error: error});
    }
};

//function for getting speciifc recipes by their id
const getSpecRecipesById = async (req, res)=>{

    try{
        const recipe = await Recipes.findByPk(req.params.id);

        if(!recipe)
            return res.json({error: "Recipe not found"});

        let result = await matchUserSingle(recipe);
        result = await matchRatingSingle(result);

        return res.json(result);
    }
    catch(error){
        return res.json({error: error});
    }
};

//function for deleting recipes
const deleteRecipe = async(req, res)=>{

    const {id} = req.query;

    try{
        await Recipes.destroy({
            where: {id: id}
        });

        return res.json({success: "the recipe is deleted"});
    }
    catch(error){
        return res.json({error: error});
    }
};

//function for updating recipes
const updateRecipe = async(req,res)=>{
    const id = req.params.id;
    const {authorId, title, body} = req.body;

    try{
        await Recipes.update({title: title, body: body}, {where: {id: id, authorId: authorId}});

        return res.json({success: "Recipe has been updated successfully!"});

    }catch(error){
        return res.json({error: "An error has occured!" + error});
    }

};

//function for creating a recipe
const createRecipe = async (req, res) => {

    try{
        const {title, authorId, body} = req.body;

        const exist = await Recipes.findOne({
            where:{
                title: title,
                authorId: authorId,
            }
        });

        if(exist)
            return res.json({error: "This recipe already exists!"});

        const recipe = await Recipes.create({
            title: title,
            authorId: authorId,
            body: body,
        });

        if(recipe)
            return res.json({success: "recipe has been created"});

        return res.json({error: "recipe wasn't created"});
    }
    catch(er){
        return res.json({error: "something went wrong"});
    }
}

module.exports = {getRecipes, getSpecRecipes, getUserRecipes, getYourSpecRecipe, getSpecRecipesById, deleteRecipe, updateRecipe, createRecipe}