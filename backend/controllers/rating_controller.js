const db = require("../models");
const rating = db.rating;
const recipe = db.recipe;

exports.get = async(req,res) => {
    const result = await rating.findByPk(req.body.data.primaryKey);
    return result;
}

exports.post = async(req,res) => {
    recipeReq = {
        query: {
            uid: req.body.data.recipeId
        }
    };

    const result = await rating.create({ 
        review: req.body.data.review, 
        stars: req.body.data.stars 
    });

    ratedRecipe = recipe.get(reqcipeReq);

    recipe.put({ 
        data: {
            name: ratedRecipe.dataValues.name, 
            instructions: ratedRecipe.dataValues.instructions,
            equipment: ratedRecipe.dataValues.equipment,
            ingredients: ratedRecipe.dataValues.ingredients,
            servings: ratedRecipe.dataValues.servings,
            details: ratedRecipe.dataValues.details,
            author: ratedRecipe.dataValues.author,
            ratings: ratedRecipe.dataValues.ratings
        }
    })
    return result;
}