const bcrypt = require('bcrypt');
const {Users} = require("../models"); //instance of models that was created
const {sign} = require('jsonwebtoken');

//this is the function used to authenticate users
const authenticate = async (req, res) => {
    res.json(req.user);
};

//this is the function used to login
const login = async (req, res)=>{
    const {username, password} = req.body; //gets the object with the data to insert into the database
   
    try{
        const user = await Users.findOne({where:{username: username}}); //creates a new object in the Posts table

        if(!user)
            return res.json({error: "User doesn't exist!"});

        bcrypt.compare(password, user.password).then((match) => {
            if(!match)
                return res.json({error: "Invalid authentication information"});

            const accessToken = sign({
                id: user.id,
                username: user.username,
            }, "importantSecret");

            return res.json({
                token: accessToken,
                username: username,
                id: user.id,
            });
        });
    }
    catch(error){
        return res.json({error: "Invalid authentication infromation"});
    }
}

//this is the function used for registering a user
const createUser =  async (req, res) => {
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
};

//this function gets the username based on the id
const getUsername =  async (req, res)=>{
    const {id} = req.query;

    try{
        const user = await Users.findByPk(id);

        if(user)
            return res.json({error: "User id isn't valid!"});

        return res.json(user);
    }catch(error){
        return res.json({error: "User id isn't valid!"});
    }
}

module.exports = {authenticate, login, createUser, getUsername};