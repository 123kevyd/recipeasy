const db = require("../models");
const recipe = db.recipe;
const rating = db.rating;
const ingredient = db.ingredient;
const equipment = db.equipment;

exports.get = async(req,res) => {
    if(req.body.data.primaryKey) {
        var result = await recipe.findByPk(req.body.data.primaryKey);
        //Jank way of grabbing ratings - will create association between recipe and rating to cleanly pull associated ratings
        let ratingsList = JSON.parse(result[recipeIndex].dataValues.ratings);
        let ratingObjects = [];
        for (ratingIndex in ratingsList) {
            let returnedRating = await rating.findByPk(ratingsList[ratingIndex]);
            if (returnedRating) {
                ratingObjects.push(returnedRating.dataValues);
            }
        }
        result.dataValues.ratings = ratingObjects;
        return result;
    } else {
        //do nothing
    }
}


exports.getAll = async() => {
	var result = await recipe.findAll()
    for (recipeIndex in result) {
        //jank way to Fetch ratings - will create associations and fetch through that in future
        let ratingsList = JSON.parse(result[recipeIndex].dataValues.ratings);
        let ratingObjects = [];
        for (ratingIndex in ratingsList) {
            const returnedRating = await rating.findByPk(ratingsList[ratingIndex]);
            if (returnedRating) {
                ratingObjects.push(returnedRating.dataValues);
            }
        }
        result[recipeIndex].dataValues.ratings = ratingObjects;
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
            time: req.body.data.time,
            tags: req.body.data.tags, 
            instructions: req.body.data.instructions,
            ingredients: JSON.stringify(req.body.data.ingredients),
            equipment: JSON.stringify(req.body.data.equipment),
            ratings: JSON.stringify(req.body.data.ratings),
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
