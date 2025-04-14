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
    
    Users.associate = (models) =>{
    Users.hasMany(models.Recipes, {
        onDelete: "cascade",

        foreignKey:{
            name: 'authorId',
            type: DataTypes.INTEGER,
        },

        });
    };

    return Users;
    //the first parameter creates a table with the name, the second parameter is an object that will define the table’s fields
    };
    