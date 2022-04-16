const db = require("../models");
const equipment = db.equipment;

exports.get = async(_req,_res) => {
    return await equipment.findAll();
}

exports.getAll = async() => {
	return await equipment.findAll();
}

exports.post = async(req, _res) => {
	const body = JSON.parse(req.body)
	console.log(body)
    if(body.name && body.name != null) {
        return await equipment.create({name: body.name});
    } else {
        // bad request
    }
}
