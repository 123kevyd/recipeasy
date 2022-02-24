//this is for testing, ratings api prob shouldnt exist
const recipe = require ("../../backend/controllers/recipe_controller.js");

export default async function handler(req, res) {

    // adding a new recipe
    if (req.method === 'POST') {
        const result = await recipe.post();
    }

    // retrieving a recipe
    else if (req.method === 'GET') {
        const result = await recipe.get();
	    res.status(200).json([{ id: 1, name: result[0].dataValues.name}])
    }
    
    else {
        console.log(req);
    }
}