import {Recipes} from '/Recipes'

module.exports = (sequelize, DataTypes) =>{ 
    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    }); 
    
    Users.hasMany(Recipes, {
        foreignKey:{
            name: 'authorId',
            type: DataTypes.INTEGER,
        }
    });

    Recipes.belongsTo(Users);

    return Users;
    //the first parameter creates a table with the name, the second parameter is an object that will define the table’s fields
    }
    