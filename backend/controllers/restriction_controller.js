const db = require("../models");
const restriction = db.restriction;

// retrieves restriction by primary key
exports.get = async(req,res) => {
    if(req.body.data.primaryKey) {
        const result = await restriction.findByPk(req.body.data.primaryKey);
        return result;
    } else {
        //do nothing
    }
}

exports.getAll = async() => {
	result = await restriction.findAll()
	return result
}

// adds an restriction to the db
exports.post = async(req,res) => {
	const body = JSON.parse(req.body)
    if(body.name && body.price != undefined) {
        const result = await restriction.create({ 
            name: body.name, 
            price: body.price
        });
        return result;
    } else {
        //do nothing
    }
}
