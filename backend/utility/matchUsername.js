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

module.exports = {matchUsername}