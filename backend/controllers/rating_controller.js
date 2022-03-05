const db = require("../models");
const rating = db.rating;

exports.get = async(req,res) => {
    const result = await rating.findByPk(req.data.primaryKey);
    return result;
}

exports.post = async(req,res) => {
    const result = await rating.create({ 
        review: req.data.review, 
        stars: req.data.stars 
    });
    return result;
}