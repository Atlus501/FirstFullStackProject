const {Users} = require('../models');

//function used to merge recipes with their usernames
const matchUsername = async (recipes) => {

    if(!recipes)
        return [];

// Extract author IDs
    const authorIds = recipes.map(recipe => recipe.authorId);

    // Fetch usernames separately
    const users = await Users.findAll({
        where: { id: authorIds },
        attributes: ["id", "username"]
    });

    // Merge usernames into recipes
    const result = recipes.map(recipe => ({
        ...recipe.toJSON(),
        username: users.find(user => user.id === recipe.authorId)?.username || "Unknown"
    }));
    return result;
};

//function used to merge recipes with their usernames
const matchUserSingle = async (recipe) => {

    if(!recipe)
        return null;

// Extract author IDs
    const authorId = recipe.authorId;

    // Fetch usernames separately
    const user = await Users.findByPk(authorId, {attributes: ["username"]});

    // Merge usernames into recipes
    const result = {...recipe.toJSON(), username: user?.username || "unknown"};
    return result;
};

//method for matching the username to the id
const matchUserById = async(id) =>{
    axios.get('http://localhost3001/users', {id: id}).then((response) => {
        if(response.data.error){
            console.log(response.data.error);
            return "";}

        return response.data.username;
    });
}

module.exports = {matchUsername, matchUserSingle, matchUserById}