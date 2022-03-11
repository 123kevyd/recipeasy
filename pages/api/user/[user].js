const user = require ("../../../backend/controllers/user_controller.js");
export default async function handler(req, res) {
	if (req.method == 'GET') {
		const result = await user.login(req.query.user);
		if(result) {
			res.status(201).json({ id: result.dataValues.id, username: result.dataValues.username});
		} else {
			res.status(500).json(null);
		}
	}
}
