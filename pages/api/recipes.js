//this is for testing, ratings api prob shouldnt exist
const recipe = require ("../../backend/controllers/recipe_controller.js");

export default async function handler(req, res) {
    // adding a new recipe
    if (req.method === 'POST') {
        try {
            const result = await recipe.post(req);
            res.status(200).json([{
                id: result.dataValues.id
            }]);
        } catch (error) {
            console.log(error);
        }
    }
    // retrieving a recipe
    else if (req.method === 'GET') {
        try {
            const result = await recipe.get(req);
	        res.status(200).json([{ 
                result
            }])
        } catch (error) {
            console.log(error);
        }
    }
    else {
        console.log(req);
    }
}