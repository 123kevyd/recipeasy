const db = require("../models");
const user = db.user;

async function addToUserList(currUser, uid, listName, id) {
	currUser[listName] = JSON.stringify(JSON.parse(currUser[listName]).concat([id]))
	currUser.save()
}

async function updateUserList(currUser, listName, listString) {
	currUser[listName] = JSON.stringify(listString)
	currUser.save()
}

exports.put = async(req, res) => {
    if (req.body && req.query.user) {
        //Body fields exist - updating an existing user's informatio
		const body = req.body
		const uid = req.query.user
        const thisUser = await user.findByPk(uid);
        var entry = null
        if (body.ingredients) {
			updateUserList(thisUser, "ingredients", body.ingredients)
        }
        if (body.equipment) {
			updateUserList(thisUser, "equipment", body.equipment)
        }
        if (body.restrictions) {
			updateUserList(thisUser, "restrictions", body.restrictions)
        }
        if (body.recipes) {
			updateUserList(thisUser, "recipes", body.recipes)
        }
		return true
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

exports.get = async(uid) => {
    const result = await user.findByPk(uid);
    return result;
}

exports.login = async(username) => {
	const [result, created] = await user.findOrCreate({where: {username: username}});
	return result
}
