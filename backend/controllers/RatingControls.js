const {Ratings} = require('../models');
const {Op} = require('sequelize');
const {matchUserById} = require('../utility/matchUsername');

//REST method for getting the ratings for speciifc recipes 
const getRatings = async(req, res) => {
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

        const ratings = [...userRatings, ...otherRatings];

        const finalRatings = await Promise.all(ratings.map(async rec => {
            const username = await matchUserById(rec.raterId);

            try{
                return {...rec.toJSON(), username: username};
            }catch(error){
                return {...rec, username: username}
            }
        }));

        return res.json(finalRatings);

    }catch(error){
        console.log('Error in getRatings in file RatingsControl: '+ error);
        return res.json({error: "There is an issue with getting the ratings"});
    }
};

//REST request for getting the average of the recipe ratings
const getAverage = async(req, res)=>{
    const {recipeId} = req.query;

    try{
        const average = Ratings.findOne({
            where: {recipeId: recipeId},
            attributes: [[fn("AVG", col("rating")), "average_rating"]],
        });

        return res.json({result: average});
    }catch(error){
        return res.json({error: "Something has gone wrong with retrieving the average"});
    }
}

//REST request for getting the user's specific rating
const getYourRating = async(req, res)=>{
    const {recipeId, raterId} = req.query;

    try{
        const rating = await Ratings.findOne({
            where: {recipeId: recipeId, raterId: raterId},
            attributes: ["value", "comment"],
        });

        if(!rating)
            return res.json({value: 0, comment: ""});

        return res.json(rating);

    }catch(error){
        console.log('Error in getYourRating in file ${__filename}', error);
        return res.json({value: 0, comment: ""});
    }
}

//REST request for creating the ratings
const createRating = async (req, res) => {
    const {recipeId, raterId, value, comment} = req.body;

    try{
        let rating = await Ratings.findOne({where: {
            recipeId: recipeId,
            raterId: raterId,
        }});

        if(rating){
            rating.value = value;
            rating.comment = comment;
            await rating.save();
            return rating;
        };
        
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
}

//REST request for deleting a rating
const deleteRating = async(req, res) => {
    const {recipeId, raterId} = req.query;

    try{
        Ratings.destroy({where: {
            recipeId: recipeId,
            raterId: raterId,
        }});

        return res.json({success: "The rating has been removed"});

    }catch(error){
        console.log(error);
        return res.status(404).json({error: "Something ahs gone wrong with deletion!"});
    }
};

//REST request for updating ratings of users
const updateRating = async(req, res) => {
    const {id} = req.params.id;
    const {value, comment} = req.body;

    try{
        const rating = await Ratings.update({value: value, comment: comment}, {where: {id: id}}); 

        return res.json(rating);
    }catch(error){
        return res.json({error: "A problem occured while updating a value"});
    }
};

module.exports = {getRatings, getAverage, getYourRating, createRating, deleteRating, updateRating}