console.log("searching for ingredient dependencies")
const ingredient = require ("../../backend/controllers/ingredient_controller.js");
console.log("dependency found")

export default async function handler(req, res)
{
	// adding a new ingredient
    if (req.method === 'POST') {
        try {
            const result = await ingredient.post(req);
            res.status(200).json([{
                id: result.dataValues.id
            }]);
        } catch (error) {
            console.log(error);
        }
    }
    // retrieving an ingredient
	// why is this here? ingredients are fetched as part of recipes and users, not on their own
    else if (req.method === 'GET') {
        try {
            const result = await ingredient.get(req);
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
