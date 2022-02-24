const db = require("../models");
const recipe = db.recipe;

exports.get = async(req,res) => {
    const result = await recipe.findByPk(req.primaryKey);
    return result;
    //console.log(result);
}

exports.post = async(req,res) => {
    const entry = await recipe.create({ review: "Heyo dude", stars: 4 });
    //console.log("Entry Auto ID:", entry.id);
}