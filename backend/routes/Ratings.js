const express = require("express");
const router = express.Router();
const {getRatings, getAverage, createRating, deleteRating, updateRating} = require('../controllers')

//REST request for getting the first few ratings
router.get("/", getRatings);

//REST request for getting the average rating
router.get("/av", getAverage);

//REST request for inputting ratings into the database
router.post("/", createRating);

//REST request for removing ratings 
router.delete("/", deleteRating);

//REST request for updating a rating
router.put("/:id", updateRating);

module.exports = router;