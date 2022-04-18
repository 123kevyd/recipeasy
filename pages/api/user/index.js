const user = require ("../../../backend/controllers/user_controller.js");
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const result = await user.post(req, res);
        res.status(201).json([{ id: result.dataValues.id, username: result.dataValues.username}]);
    } else {
        res.status(405).json();
    }
}