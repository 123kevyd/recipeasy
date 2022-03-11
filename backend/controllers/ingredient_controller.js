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

// adds an ingredient to the db
exports.post = async(req,res) => {
    if(req.body.data.name && req.body.data.price) {
        const result = await ingredients.create({ 
            name: req.body.data.name, 
            price: req.body.data.price
        });
        return result;
    } else {
        //do nothing
    }
}
