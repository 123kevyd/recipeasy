const equipment = require ("../../backend/controllers/equipment.controller.js");
export default function handler(req, res) {
	const result = equipment.get();
	console.log(result[0]);
	res.status(200).json({ id: 1, name: result[0].dataValues.name})
}
