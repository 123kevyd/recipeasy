const ingredients = require("../../backend/controllers/ingredient_controller.js");

export default async function handler(req, res) {
	// adding a new ingredient
    if (req.method === 'POST') {
        try {
            const result = await ingredients.post(req, res);
            // if result == undefined, post was not succesful
            if (result != undefined) {
                res.status(200).json([{
                    id: result.dataValues.id,
                    title: result.dataValues.name
                }]);
            } else {
                throw 'Error creating a new ingredient'
            }
        } catch (error) {
			res.status(500).send({error: 'failed to post ingredient'})
        }
    } else if (req.method === 'GET') {
        try {
            const result = await ingredients.get(req);
            res.status(200).json([{
                result
            }])
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error(req);
    }
}
