//this is the route that is used for making operations on the users database
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const {Users} = require("../models"); //instance of models that was created

//the route that used to create users
router.post('/', async (req, res)=>{
    const {username, password} = req.body; //gets the object with the data to insert into the database
   
    try{
        const user = await Users.findOne({where:{username: username}}); //creates a new object in the Posts table

        if(!user)
            return res.json({error: "User doesn't exist!"});

        bcrpyt.compare(password, user.password).then((match) => {
            if(!match)
                return res.json({error: "Invalid authentication information"});

            return res.json({success: "User is found"});
        });
    }
    catch(error){
        return res.json({error: "Invalid authentication infromation"});
    }
});//request for sending data to the database

//request for registering the user into the database
router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    try{
        await bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash,
            });
            return res.json({success: "User is created"});
        });
    }
    catch(error){
        return res.json({error: "User wasn't created!"});
    }

});

module.exports = router;
