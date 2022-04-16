const db = require("../models");
const restriction = db.restriction;

// retrieves restriction by primary key
exports.get = async(req,_res) => {
    if(req.body.data.primaryKey) {
        return await restriction.findByPk(req.body.data.primaryKey);
    } else {
        //do nothing
    }
}

exports.getAll = async() => {
	return await restriction.findAll()
}

// adds an restriction to the db
exports.post = async(req,_res) => {
	const body = JSON.parse(req.body)
    if(body.name && body.price != undefined) {
        return await restriction.create({ 
            name: body.name, 
            price: body.price
        });
    } else {
        //do nothing
    }
}
