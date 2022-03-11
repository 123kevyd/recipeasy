const db = require("../models");
const equipment = db.equipment;

exports.get = async(req,res) => {
    const result = await equipment.findAll();
    return result;
}

exports.getAll = async() => {
	result = await equipment.findAll()
	return result
}
//exports.getAll = async(jsonArr) => {
	//const idList = JSON.parse(jsonArr)
	//const result = equipment.findAll({
		//where: {
			//id: idList
		//}
	//})
    //return result
//}

exports.post = async(req, res) => {
    if(req.body.data.name) {
        const result = await equipment.create({name: req.body.data.name});
        return result;
    } else {
        //Missing the new equipment's name in body
    }
}

