const db = require("../models");
const rating = db.rating;
const recipe = require("./recipe_controller.js");

exports.get = async(req,_res) => {
    if(req.body.data.primaryKey) {
        return await rating.findByPk(req.body.data.primaryKey);
    } else {
        //do nothing
    }
}

exports.post = async(req,_res) => {
    if(req.body.data.review != null && req.body.data.stars && req.body.data.recipeId && req.body.data.difficulty) {
        const recipeReq = {
            body: {
                data: {
                    primaryKey: req.body.data.recipeId
                }
            }
        };

        const result = await rating.create({ 
            review: req.body.data.review, 
            stars: req.body.data.stars,
            difficulty: req.body.data.difficulty
        });
        
        const ratedRecipe = await recipe.get(recipeReq);
        let ratingIds = [result.dataValues.id];

        ratedRecipe.dataValues.ratings = ratedRecipe.dataValues.ratings.map(function(innerRating) {
            return innerRating.id
        })

        if(ratedRecipe.dataValues.ratings){
            ratingIds = ratingIds.concat(ratedRecipe.dataValues.ratings);
        }

        recipe.put({ 
            body: {
                data: {
                    primaryKey: ratedRecipe.dataValues.id,
                    name: ratedRecipe.dataValues.name, 
                    time: ratedRecipe.dataValues.time,
                    tags: ratedRecipe.dataValues.tags,
                    instructions: ratedRecipe.dataValues.instructions,
                    equipment: JSON.parse(ratedRecipe.dataValues.equipment),
                    ingredients: JSON.parse(ratedRecipe.dataValues.ingredients),
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
