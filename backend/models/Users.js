module.exports = (sequelize, DataTypes) =>{ 
    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    }) //the first parameter creates a table with the name, the second parameter is an object that will define the table’s fields
    }
    