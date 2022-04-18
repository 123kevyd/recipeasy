const equipment = require("../../backend/controllers/equipment_controller.js");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const result = await equipment.post(req, res);
        res.status(200).json([{id: result.dataValues.id, title: result.dataValues.name}]);
    } else if (req.method === "GET") {
        const result = await equipment.get(req, res);
        var equipmentList = {
            "data": []
        };
        result.map(function(equip) {
            equipmentList.data.push({
                "id": equip.id,
                "name": equip.name
            })
        })
        res.status(200).json({equipmentList});
    } else {
        res.status(405).json();
    }
}
