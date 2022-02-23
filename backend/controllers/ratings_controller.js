const db = require("../models");
const rating = db.rating;

exports.get = async(req,res) => {
    const result = await rating.findAll();
    return result;
    //console.log(result);
}