
const rating = require("../../backend/controllers/rating_controller.js");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const result = await rating.post(req);
        res.status(200).json([{
            id: result.dataValues.id,
            stars: result.dataValues.stars,
            difficulty: result.dataValues.difficulty,
            review: result.dataValues.review
        }]);
    } else if (req.method === "GET") {
        const result = await rating.get(req);
        res.status(200).json([{
            id: result.dataValues.id,
            stars: result.dataValues.stars,
            difficulty: result.dataValues.difficulty,
            review: result.dataValues.review
        }])
    } else {
        console.error(req);
    }
}
