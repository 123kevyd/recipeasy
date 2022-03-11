const db = require("../models");
const ingredients = db.ingredient;

// retrieves ingredient by primary key
exports.get = async(req,res) => {
    const result = await ingredients.findByPk(req.body.data.primaryKey);
    return result;
}

exports.getAll = async() => {
	result = await ingredients.findAll()
	return result
}
//exports.getAll = async(jsonArr) => {
	//const idList = JSON.parse(jsonArr)
	//const result = ingredients.findAll({
		//where: {
			//id: idList
		//}
	//})
    //return result
//}

// adds an ingredient to the db
exports.post = async(req,res) => {
    const result = await ingredients.create({ 
        name: req.body.data.name, 
        price: req.body.data.price
    });
    
    return result;
}
