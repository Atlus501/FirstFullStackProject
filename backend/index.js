//this is the main entry point for the backend

const express = require("express");
const db = require("./models");
const app = express();

app.use(express.json());

const userRouter = require('./routers/Users');
app.use("/users", userRouter);

//this is the function that makes the models in the database
db.sequelize.sync().then( () =>{
    app.listen(3001, () =>{
    console.log("server running on port 3001");
    });
});