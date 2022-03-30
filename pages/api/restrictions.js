const restriction = require ("../../backend/controllers/restriction_controller.js");

export default async function handler(req, res)
{
	// adding a new restriction
    if (req.method === 'POST') {
        try {
            const result = await restriction.post(req);
            res.status(200).json([{
                id: result.dataValues.id
            }]);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        console.log(req);
    }
}