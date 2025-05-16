const express = require('express');
const router = express.Router();
const {Recipes} = require("../models");
const {Op} = require('sequelize');
const {validateToken} = require("../middlewares/AuthMiddleware");
const {getRecipes, getSpecRecipes, getUserRecipes,
    getYourSpecRecipe, getSpecRecipesById, deleteRecipe, updateRecipe, createRecipe
} = require("../controllers/RecipeControls");

//request for getting 10 first recipes
router.get("/", getRecipes);

//request for getting specific recipes with titles
router.get("/search", getSpecRecipes);

//REST request for getting your recipes
router.get("/search/your", getUserRecipes);

//REST rquest for getting specific recipes
router.get("/search/your/specific", getYourSpecRecipe);

//request for getting a specific recipe
router.get("/search/id/:id", getSpecRecipesById);

//request for deleting a post
router.delete("/delete", deleteRecipe);

//REST request for editing the body of a recipe
router.put("/:id", validateToken, updateRecipe);

//request for posting the recipe
router.post("/", validateToken, createRecipe);

module.exports = router;