const db = require("../models");
const ingredients = db.ingredient;

// retrieves ingredient by primary key
exports.get = async(req,res) => {
    if(req.body.data.primaryKey) {
        const result = await ingredients.findByPk(req.body.data.primaryKey);
        return result;
    } else {
        //do nothing
    }
}

exports.getAll = async() => {
	result = await ingredients.findAll()
	return result
}

// adds an ingredient to the db
exports.post = async(req,res) => {
	const body = JSON.parse(req.body);
    if(body.name && body.price != undefined) {
        const result = await ingredients.create({ 
            name: body.name, 
            price: body.price
        });
        return result;
    } else {
        //do nothing
    }
}
