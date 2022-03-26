const db = require("../models");
const recipe = db.recipe;
const rating = db.rating;
const ingredient = db.ingredient;
const equipment = db.equipment;

exports.get = async(req,res) => {
    var result = await recipe.findAll();
    for (recipeIndex in result) {
        //Fetch ratings
        let ratingsList = JSON.parse(result[recipeIndex].dataValues.ratings);
        result[recipeIndex].dataValues.ratings = []
        result[recipeIndex].dataValues.ingredients = JSON.parse(result[recipeIndex].dataValues.ingredients)
        result[recipeIndex].dataValues.equipment = JSON.parse(result[recipeIndex].dataValues.equipment)
        for (ratingIndex in ratingsList) {
            const returnedRating = await rating.findByPk(ratingsList[ratingIndex]);
            if (returnedRating) {
                result[recipeIndex].dataValues.ratings.push(returnedRating.dataValues);
            }
        }

        // let ingredientsList = JSON.parse(result[recipeIndex].dataValues.ingredients);
        // console.log('ingredients List');
        // console.log(ingredientsList);
        // result[recipeIndex].dataValues.ingredients = []
        // for (ingredientIndex in ingredientsList) {
        //     // console.log('ingredient list');
        //     // console.log(ingredientsList[ingreidentIndex])
        //     const returnedIngredient = await ingredient.findByPk(ingredientsList[ingredientIndex].id)
        //     if (returnedIngredient) {
        //         console.log('returned ingredient');
        //         //{ name: "all-purpose flour", quantity: 1, unit: "cup"},
        //         console.log(returnedIngredient.dataValues);
        //         console.log('value being returned');
        //         value = {"name": returnedIngredient.name, "quantity": ingredientsList[ingredientIndex].quantity, "unit": ingredientsList[ingredientIndex].unit};
        //         result[recipeIndex].dataValues.ingredients.push(value);
        //     }
        // }

        // //Fetch equipment
        // let equipmentList = JSON.parse(result[recipeIndex].dataValues.equipment);
        // result[recipeIndex].dataValues.equipment = []
        // for (equipmentIndex in equipmentList) {
        //     const returnedEquipment = await equipment.findByPk(equipmentList[equipmentIndex]);
        //     if (returnedEquipment) {
        //         result[recipeIndex].dataValues.equipment.push(returnedEquipment.dataValues);
        //     }
        // }
    }
    return result;
}

exports.getAll = async() => {
	result = await recipe.findAll()
	return result
}
	

exports.post = async(req,res) => {
    if(req.body.data.name && req.body.data.instructions && req.body.data.ingredients) {
        const entry = await recipe.create({ 
            name: req.body.data.name, 
            instructions: req.body.data.instructions,
            ingredients: JSON.stringify(req.body.data.ingredients),
            equipment: JSON.stringify(req.body.data.equipment),
            servings: req.body.data.servings,
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
