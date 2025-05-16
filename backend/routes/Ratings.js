const express = require("express");
const router = express.Router();
const {Ratings} = require('../models');
const {Op} = require('sequelize');

//REST request for getting the first few ratings
router.get("/", async(req, res) => {
    const {recipeId, raterId} = req.query;

    try{
        const userRatings = await Ratings.findAll({
            where: {recipeId: recipeId, raterId: raterId},
            limit: 25,
        });

        const remainingLimit = 25 - userRatings.length;

        const otherRatings = await Ratings.findAll({
            where: {
                recipeId: recipeId,
                raterId: {[Op.not]: raterId},
            },
            limit: remainingLimit > 0 ? remainingLimit : 0,
        });

        const ratings = [...userRatings, ...otherRatings]

        return res.json(ratings);

    }catch(error){
        return res.json({error: "There is an issue with getting the ratings"});
    }
});

//REST request for getting the average rating
router.get("/av", async(req, res)=>{
    const {recipeId} = req.query;

    try{
        const average = Ratings.findOne({
            where: {recipeId: recipeId},
            attributes: [[fn("AVG", col("rating")), "average_rating"]],
        });

        return res.json({result: average});
    }catch(error){
        return res.json({error: "Something has gone wrong with retrieving the median"});
    }
});

//REST request for inputting ratings into the database
router.post("/", async (req, res) => {
    const {recipeId, raterId, value, comment} = req.body;

    try{
        let rating = await Ratings.findOne({where: {
            recipeId: recipeId,
            raterId: raterId,
        }});

        if(rating)
            return res.json({error: "This recipe already has been rated by you!"});
        
        rating = await Ratings.create({
            recipeId: recipeId,
            raterId: raterId,
            value: value,
            comment: comment,
        });

        return res.json({rating});
    }
    catch(error){
        
        return res.json({error: "An error has occured!"});
    }
});

//REST request for removing ratings 
router.delete("/", async(req, res) => {
    const {id} = req.body;

    try{
        Ratings.destroy({where: {
            id: id,
        }});

        return res.json({success: "The rating has been removed"});

    }catch(error){
        console.log(error);
        return res.status(404).json({error: "Something ahs gone wrong with deletion!"});
    }
});

//REST request for updating a rating
router.put("/:id", async(req, res) => {
    const {id} = req.params.id;
    const {value, comment} = req.body;

    try{
        const rating = await Ratings.update({value: value, comment: comment}, {where: {id: id}}); 

        return res.json(rating);
    }catch(error){
        return res.json({error: "A problem occured while updating a value"});
    }
});

module.exports = router;