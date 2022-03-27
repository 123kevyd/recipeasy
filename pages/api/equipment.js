console.log("searching for dependencies")
const equipment = require ("../../backend/controllers/equipment_controller.js");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const result = await equipment.post(req, res);
        res.status(200).json([{id: result.dataValues.id, name: result.dataValues.name}]);
    }
    else if (req.method === 'GET') {
        const result = await equipment.get(req, res);
        var equipment_list = {
            "data": []
        };
        result.map(function(equip) {
            equipment_list.data.push({
                "id" : equip.id,
                "name" : equip.name
            })
        })
	    res.status(200).json({equipment_list});
    }
    else {
        res.status(405).json();
    }
}
