const db = require("../models");
const recipe = db.recipe;
const rating = db.rating;
const ingredient = db.ingredient;
const equipment = db.equipment;

exports.get = async(req,res) => {
    if(req.body.data.primaryKey) {
        const result = await recipe.findByPk(req.body.data.primaryKey);
        let ratingsList = JSON.parse(result[recipeIndex].dataValues.ratings);
        result.dataValues.ratings = []
        for (ratingIndex in ratingsList) {
            const returnedRating = await rating.findByPk(ratingsList[ratingIndex]);
            if (returnedRating) {
                result.dataValues.ratings.push(returnedRating.dataValues);
            }
        }
        return result;
    } else {
        //do nothing
    }
}


exports.getAll = async() => {
	var result = await recipe.findAll()
    for (recipeIndex in result) {
        //Fetch ratings
        let ratingsList = JSON.parse(result[recipeIndex].dataValues.ratings);
        result[recipeIndex].dataValues.ratings = []
        for (ratingIndex in ratingsList) {
            const returnedRating = await rating.findByPk(ratingsList[ratingIndex]);
            if (returnedRating) {
                result[recipeIndex].dataValues.ratings.push(returnedRating.dataValues);
            }
        }
    }
	return result
}
	

exports.post = async(req,res) => {
    if(req.body.data.name && req.body.data.instructions && req.body.data.ingredients) {
        const entry = await recipe.create({ 
            name: req.body.data.name,
            time: req.body.data.time,
            tags: req.body.data.tags, 
            instructions: req.body.data.instructions,
            equipment: JSON.stringify(req.body.data.equipment),
            ingredients: JSON.stringify(req.body.data.ingredients),
            details: req.body.data.details,
            author: req.body.data.author
        });
        return entry;
    } else {
        //do nothing
    }
}

exports.put = async(req,res) => {
    if(req.body.data.name && req.body.data.instructions && req.body.data.ingredients) {
        const entry = await recipe.update({
            name: req.body.data.name, 
            instructions: req.body.data.instructions,
            ingredients: JSON.stringify(req.body.data.ingredients),
            equipment: JSON.stringify(req.body.data.equipment),
            ratings: JSON.stringify(req.body.data.ratings),
            servings: req.body.data.servings,
            details: req.body.data.details,
            author: req.body.data.author
        }, {
                where: {
                    id: req.body.data.primaryKey
                }
            });
        return entry;
    } else {
        //do nothing
    }
}
