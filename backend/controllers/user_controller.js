const db = require("../models");
const user = db.user;

exports.get = async(req,res) => {
    const result = await user.findByPk(req.primaryKey);
    return result;
}