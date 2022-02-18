const equipment = require ("../../backend/controllers/equipment_controller.js");
export default async function handler(req, res) {
	const result = await equipment.get();
	console.log(result);
	res.status(200).json([{ id: 1, name: result[0].dataValues.name}])
}
