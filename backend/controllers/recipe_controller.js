const db = require("../models");
const recipe = db.recipe;
const rating = db.rating;

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
	// I know its less readable, but organizing the function like this saved 14 seconds of startup time
	var result = await recipe.findAll()
	var ratingIds = []
	var ratingIdToRecipeMap = new Map()
    for (let recipe of result) {
		const ratings = JSON.parse(recipe.dataValues.ratings)
		if(ratings){
			ratingIds = ratingIds.concat(ratings)
			for(id of ratings){
				ratingIdToRecipeMap.set(id, recipe)
			}
			recipe.dataValues.ratings = []
		}else{
			recipe.dataValues.ratings = []
		}
	}
	var ratings = await rating.findAll({
		where: {
			id: ratingIds
		}
	})
	for(let rating of ratings){
		ratingIdToRecipeMap.get(rating.dataValues.id).dataValues.ratings.push(rating.dataValues)
	}
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
