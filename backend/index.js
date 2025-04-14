//this is the main entry point for the backend

const express = require("express");
const app = express();
const cors = require("cors");

const db = require('./models');

app.use(express.json());
app.use(cors());
//C:\Users\CoolL\my-react-app-0\backend\models. backend\models

const userRouter = require('./routes/Users');
app.use("/users", userRouter);

const recipeRouter = require('./routes/Recipes');
app.use("/recipes", recipeRouter);

//this is the function that makes the models in the database


db.sequelize.sync().then( () =>{
    app.listen(3001, () =>{
    console.log("server running on port 3001");
    });
});