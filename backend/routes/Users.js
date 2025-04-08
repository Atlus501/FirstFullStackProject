//this is the route that is used for making operations on the users database
const express = require("express");
const router = express.Router();
const {Users} = require("../models"); //instance of models that was created

//the post that used to create users
router.post('/', async (req, res)=>{
    const user = req.body; //gets the object with the data to insert into the database
    user = await Users.create(user); //creates a new object in the Posts table

    try{
        if(user)
            return res.json({success: "user has been created"});

        return res.json({error: "user wasn't created"});
    }
    catch(error){
        return res.json({error: "user wasn't created"});
    }

});//request for sending data to the database

module.exports = router;
