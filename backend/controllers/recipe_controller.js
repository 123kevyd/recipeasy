const db = require("../models");
const recipe = db.recipe;
const rating = db.rating;
const {performance} = require('perf_hooks')

exports.get = async(req,res) => {
    if(req.body.data.primaryKey) {
        var result = await recipe.findByPk(req.body.data.primaryKey);
        //Grab ratings - will be replaced by association fetch in future
        if (result.dataValues.ratings) {
            let ratingsList = JSON.parse(result.dataValues.ratings);
            let ratingObjects = [];
            for (ratingIndex in ratingsList) {
                let returnedRating = await rating.findByPk(ratingsList[ratingIndex]);
                if (returnedRating) {
                    ratingObjects.push(returnedRating.dataValues);
                }
            }
            result.dataValues.ratings = ratingObjects;
        } else {
            result.dataValues.ratings = [];
        }
        return result;
    } else {
        //do nothing
    }
}


exports.getAll = async() => {
	const t1 = performance.now()
	var result = await recipe.findAll()
    for (recipeRes of result) {
		const recipe = recipeRes.dataValues

        //Grab ratings - will be replaced by association fetch in future
        if (recipe.ratings) {
            recipe.ratings = (await rating.findAll({
				where: {
					id: JSON.parse(recipe.ratings)
				}
			})).map(ratingRes => ratingRes.dataValues)
        } else {
            recipe.ratings = [];
        }
    }
	console.log("recipe getall time")
	console.log(performance.now() - t1)
	return result
}
	

exports.post = async(req,res) => {
    if(req.body.data.name && req.body.data.instructions && req.body.data.ingredients) {
        const entry = await recipe.create({ 
            name: req.body.data.name,
            time: req.body.data.time,
            tags: JSON.stringify(req.body.data.tags), 
            instructions: JSON.stringify(req.body.data.instructions),
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
