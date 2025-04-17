const express = require('express');
const router = express.Router();
const {Recipes} = require("../models");
const {Op} = require('sequelize');

const {validateToken} = require("../middlewares/AuthMiddleware");

//request for getting 10 first recipes
router.get("/", async (req,res) =>{
    const recipes = await Recipes.findAll({
        limit: 15,
    });

    if(recipes.length === 0)
        return res.json({error: "The database is empty"});

    return res.json(recipes);
});

//request for getting specific recipes with titles
router.get("/search", async (req, res) => {
    const {title} = req.query;

    try{
        const recipes = await Recipes.findAll({
            where:{
                title: {[Op.like]: '%'+title+'%'},
            }
        });

        return res.json(recipes);
    }
    catch(error){
        return res.json({error: error});
    }
});

//REST request for getting your recipes
router.get("/search/your", async (req, res) =>{
    const {userId} = req.query;

    try{
        const recipes = await Recipes.findAll({
            where:{authorId: userId},
        });

        if(recipes.length === 0)
            return res.json({error: "recipes not found"});

        return res.json(recipes);
    }
    catch(error){
        return res.json({error: error});
    }
});

//request for getting a specific recipe
router.get("/search/id/:id", async (req, res)=>{

    const id = req.params.id;

    try{
        const recipe = await Recipes.findByPk(id);

        if(!recipe)
            return res.json({error: "Recipe not found"});

        return res.json(recipe);
    }
    catch(error){
        return res.json({error: error});
    }
});

//request for posting the recipe
router.post("/", validateToken, async (req, res) => {

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
});

module.exports = router;