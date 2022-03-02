//this is for testing, ratings api prob shouldnt exist
const recipe = require ("../../backend/controllers/recipe_controller.js");

export default async function handler(req, res) {

    // adding a new recipe
    if (req.method === 'POST') {
        try {
            const result = await recipe.post();
            res.status(200);
        } catch (error) {
            console.log(error);
        }
        
    }

    // retrieving a recipe
    else if (req.method === 'GET') {
        try {
            const result = await recipe.get();
	        res.status(200).json([{ result }])
        } catch (error) {
            console.log(error);
        }
    }

    else {
        console.log(req);
    }
}