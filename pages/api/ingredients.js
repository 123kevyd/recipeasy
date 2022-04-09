const ingredients = require ("../../backend/controllers/ingredient_controller.js");

export default async function handler(req, res)
{
	// adding a new ingredient
    if (req.method === 'POST') {
        try {
            const result = await ingredients.post(req, res);
            // if result == undefined, post was not succesful
            if (result != undefined) {
                res.status(200).json([{
                    id: result.dataValues.id,
                    title : result.dataValues.name
                }]);
            } else {
                throw error
            }   

        } catch (error) {
            console.log(error);
        }
    }
    // retrieving an ingredient
	// why is this here? ingredients are fetched as part of recipes and users, not on their own
    else if (req.method === 'GET') {
        try {
            const result = await ingredients.get(req);
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
