const db = require("../models");
const rating = db.rating;

exports.get = async(req,res) => {
    const result = await rating.findByPk(1);
    return result;
    //console.log(result);
}

exports.post = async(req,res) => {
    const entry = await rating.create({ review: "Heyo dude", stars: 4 });
    console.log("Entry Auto ID:", entry.id);
}