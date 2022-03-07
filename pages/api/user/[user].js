const user = require ("../../../backend/controllers/user_controller.js");
export default async function handler(req, res) {
	if (req.method == 'GET') {
		console.log(req.query)
		const result = await user.login(req, res);
		console.log(result)
		res.status(201).json([{ id: result.dataValues.id, username: result.dataValues.username}]);
	}
}
