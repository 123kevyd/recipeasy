const user = require ("../../../backend/controllers/user_controller.js");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        //TODO Check the result to see if the query went through - for all user routes
        const result = await user.post(req, res);
        res.status(201).json([{ rowsAffected: result[0]}]);
    } else if (req.method === 'DELETE'){
        const result = await user.delete(req, res);
        res.status(204).json();
    }
}