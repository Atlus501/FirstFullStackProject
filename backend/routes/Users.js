//this is the route that is used for making operations on the users database
const express = require("express");
const router = express.Router();
const {validateToken} = require('../middlewares/AuthMiddleware');
const {authenticate, login, createUser, getUsername} = require('../controllers/UserControl')

//this is the method that would authenticate the user
router.get("/auth", validateToken, authenticate);

//the route that used to create users
router.post('/', login);//request for sending data to the database

//request for registering the user into the database
router.post("/register", createUser);

//REST request for getting the username by id
router.get("/", getUsername);

module.exports = router;
