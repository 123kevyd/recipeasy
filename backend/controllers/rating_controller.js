const db = require("../models");
const rating = db.rating;

exports.get = async(req,res) => {
    const result = await rating.findByPk(req.data.primaryKey);
    return result;
}

exports.post = async(req,res) => {
    if(req.body.data.review && req.body.data.stars) {
        const entry = await rating.create({ 
            review: req.data.review, 
            stars: req.data.stars 
        });
        return entry;
    } else {
        //do nothing
    }
}