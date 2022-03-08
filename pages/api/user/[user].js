const user = require ("../../../backend/controllers/user_controller.js");
export default async function handler(req, res) {
	if (req.method == 'GET') {
		console.log("username:")
		const result = await user.login(req, res);
		console.log(result)
		if(result) {
			res.status(201).json([{ id: result[0].dataValues.id, username: result[0].dataValues.username}]);
		} else {
			res.status(500).json(null);
		}
	}
}
