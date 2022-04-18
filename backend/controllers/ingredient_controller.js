const db = require("../models");
const ingredients = db.ingredient;

// retrieves ingredient by primary key
exports.get = async(req,_res) => {
    if(req.body.data.primaryKey) {
        return ingredients.findByPk(req.body.data.primaryKey);
    } else {
        //do nothing
    }
}

exports.getAll = async() => {
	return ingredients.findAll()
}

// adds an ingredient to the db
exports.post = async(req,_res) => {
	const body = JSON.parse(req.body);
    if(body.name && body.price != undefined) {
        return ingredients.create({ 
            name: body.name, 
            price: body.price
        });
    } else {
        //do nothing
    }
}
