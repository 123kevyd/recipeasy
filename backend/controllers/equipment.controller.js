const db = require("../models");
const equipment = db.equipment;

exports.get = async(req,res) => {
    const result = await equipment.findAll();
    console.log(result);
}

