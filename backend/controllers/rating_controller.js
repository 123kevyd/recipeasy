const db = require("../models");
const rating = db.rating;
//const recipe = recipe_controller.js;
const recipe = require ("./recipe_controller.js");

exports.get = async(req,res) => {
    const result = await rating.findByPk(req.body.data.primaryKey);
    return result;
}

exports.post = async(req,res) => {
    if(req.body.data.review && req.body.data.stars && req.body.data.recipeId) {
        recipeReq = {
            body: {
                data: {
                    primaryKey: req.body.data.recipeId
                }
            }
        };

        const result = await rating.create({ 
            review: req.body.data.review, 
            stars: req.body.data.stars 
        });
        
        ratedRecipe = await recipe.get(recipeReq);
        ratingIds = [result.dataValues.id];

        if(ratedRecipe.dataValues.ratings){
            ratingIds = ratingIds.concat(JSON.parse(ratedRecipe.dataValues.ratings));
        }

        recipe.put({ 
            body: {
                data: {
                    primaryKey: ratedRecipe.dataValues.id,
                    name: ratedRecipe.dataValues.name, 
                    instructions: ratedRecipe.dataValues.instructions,
                    equipment: JSON.parse(ratedRecipe.dataValues.equipment),
                    ingredients: JSON.parse(ratedRecipe.dataValues.ingredients),
                    servings: ratedRecipe.dataValues.servings,
                    details: ratedRecipe.dataValues.details,
                    author: ratedRecipe.dataValues.author,
                    ratings: ratingIds
                }
            }
        })

        return result;

    } else {
        //nothing
    }
}