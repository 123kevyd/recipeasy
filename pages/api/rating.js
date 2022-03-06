//this is for testing, ratings api prob shouldnt exist
const rating = require ("../../backend/controllers/rating_controller.js");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const result = await rating.post();
    }
    else if (req.method === 'GET') {
        const result = await rating.get();
	    res.status(200).json([{ id: 1, name: result[0].dataValues.name}])
    }
    else {
        console.log(req);
    }
}