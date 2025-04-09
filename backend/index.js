//this is the main entry point for the backend

const express = require("express");
const app = express();

const db = require("./models");

app.use(express.json());

const userRouter = require('./routes/Users');
app.use("/Users", userRouter);

const recipeRouter = require('./routes/Recipes');
app.use("/Recipe", recipeRouter);

//this is the function that makes the models in the database
db.sequelize.sync().then( () =>{
    app.listen(3001, () =>{
    console.log("server running on port 3001");
    });
});