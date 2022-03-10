const db = require("../models");
const user = db.user;

exports.post = async(req, res) => {
    if (req.body.data.ingredients || req.body.data.equipment || req.body.data.restrictions || req.body.data.recipes) {
        //Body fields exist - updating an existing user's informatio
        entry = null
        if (req.body.data.ingredients) {
            entry = await user.update({ingredients: JSON.stringify(req.body.data.ingredients),
                                            where: {
                                                id: req.query.uid
                                            }
            })
        }
        if (req.body.data.equipment) {
            entry = await user.update({equipment: JSON.stringify(req.body.data.equipment),
                                            where: {
                                                id: req.query.uid
                                            }
            })
        }
        if (req.body.data.restrictions) {
            entry = await user.update({restrictions: JSON.stringify(req.body.data.restrictions),
                where: {
                    id: req.query.uid
                }
            })
        }
        if (req.body.data.recipes) {
            entry = await user.update({recipes: JSON.stringify(req.body.data.recipes),
                where: {
                    id: req.query.uid
                }
            })
        }
        //Model.update only returns an array with the number of rows affected
        return entry;
    }else if (req.body.data.username) {
        entry = await user.findOne({
            where: {
                username: req.body.data.username
            }
        })

        if (!entry) {
            entry = await user.create({username: req.body.data.username});
        }

        return entry;
    }else {
        //Bad request
    }
    
}

exports.delete = async(req, res) => {
    const result = await user.destroy({
        where: {
            id: req.query.uid
        }
    });
    return result;
}

exports.get = async(req,res) => {
    if (req.query.uid) {
        return await user.findByPk(req.query.uid);
    } else {
        //uid passed directly into the get method, for getServerSideProps
        return await user.findByPk(req);
    }
}