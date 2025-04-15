const express = require('express');
const router = express.Router();
const {Recipes} = require("../models");

const {validateToken} = require("../middlewares/AuthMiddleware");

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