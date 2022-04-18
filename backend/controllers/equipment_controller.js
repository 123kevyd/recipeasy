const db = require("../models");
const equipment = db.equipment;

exports.get = async(_req,_res) => {
    return equipment.findAll();
}

exports.getAll = async() => {
	return equipment.findAll();
}

exports.post = async(req, _res) => {
	const body = JSON.parse(req.body)
	console.log(body)
    if(body.name && body.name != null) {
        return equipment.create({name: body.name});
    } else {
        // bad request
    }
}
