const db = require("../models");
const ingredients = db.ingredient;

// retrieves ingredient by primary key
exports.get = async(req,res) => {
    const result = await ingredients.findByPk(req.body.data.primaryKey);
    return result;
}

// adds an ingredient to the db
exports.post = async(req,res) => {
    recipeReq = {
        body: {
            data: {
                primaryKey: req.body.data.recipeId
            }
        }
    };

    const result = await ingredients.create({ 
        name: req.body.data.name, 
        price: req.body.data.price
    });
    
    return result;
}