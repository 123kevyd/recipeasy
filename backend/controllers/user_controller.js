const db = require("../models");
const user = db.user;

exports.post = async(req, res) => {
    if (req.body.data.ingredients && req.body.data.equipment && req.body.data.restrictions && req.body.data.recipes) {
        //Body fields exist - updating an existing user's information
        console.log(req.body.data);
        const entry = await user.update({ingredients: JSON.stringify(req.body.data.ingredients),
                                        equipment: JSON.stringify(req.body.data.equipment),
                                        restrictions: JSON.stringify(req.body.data.restrictions),
                                        recipes: JSON.stringify(req.body.data.recipes)}, {
                                            where: {
                                                id: req.query.uid
                                            }
                                        });
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
    console.log(req.query)
    const result = await user.destroy({
        where: {
            id: req.query.uid
        }
    });
    return result;
}

exports.get = async(req,res) => {
    const result = await user.findByPk(req.query.uid);
    return result;
}

//For getServerSideProps
exports.get = async(uid) => {
    const result = await user.findByPk(uid);
    return result;
}