const db = require("../models");
const recipe = db.recipe;

exports.get = async(req,res) => {
    const result = await recipe.findByPk(req.data.primaryKey);
    return result;
    //console.log(result);
}

exports.post = async(req,res) => {
    const entry = await recipe.create({ 
        name: req.data.name, 
        instructions: req.data.instructions,
        equipment: req.data.equipment,
        ingredients: req.data.ingredients,
        servings: req.data.servings,
        details: req.data.details,
        author: req.data.author
    });
    console.log("Entry Auto ID:", entry.id);
}