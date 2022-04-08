const db = require("../models");
const equipment = db.equipment;

exports.get = async(req,res) => {
    const result = await equipment.findAll();
    return result;
}

exports.getAll = async() => {
	result = await equipment.findAll()
	return result
}

exports.post = async(req, res) => {
	const body = JSON.parse(req.body)
	console.log(body)
    if(body.name && body.name != null) {
        const result = await equipment.create({name: body.name});
        return result;
    } else {
        // bad request
    }
}
