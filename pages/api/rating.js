
const rating = require ("../../backend/controllers/rating_controller.js");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const result = await rating.post(req);
        res.status(200).json([{id: result.dataValues.id}]);
    }
    else if (req.method === 'GET') {
        const result = await rating.get(req);
	    res.status(200).json([{ 
            id: result.dataValues.id,
            rating: result.dataValue.stars,
            description: result.dataValue.review
        }])
    }
    else {
        console.log(req);
    }
}