const ingredient = require ("../../backend/controllers/ingredient_controller.js");

export default function handler(req, res)
{
	// call some sequelizer code, or some backend logic from here
	
	res.status(200).json([{name: 'salt', id: 9}])

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
