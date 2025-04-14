const express = require('express');
const router = express.Router();
const {Recipes} = require("../models");

//request for posting the recipe
router.post("/", async (req, res) => {
const recipe = req.body();
recipe = await Recipes.create(recipe);
try{
    if(recipe)
        return res.json({success: "recipe has been created"});

    return res.json({error: "recipe wasn't created"});
}
catch(error){
    return res.json({error: "recipe wasn't created"});
}
});

module.exports = router;