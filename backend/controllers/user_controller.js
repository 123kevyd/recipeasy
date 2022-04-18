const db = require("../models");
const user = db.user;

async function updateUserList(currUser, listName, listString) {
	currUser[listName] = JSON.stringify(listString)
	currUser.save()
}

exports.put = async(req, _res) => {
    if (req.body && req.query.user) {
        //Body fields exist - updating an existing user's informatio
		const body = JSON.parse(req.body)
		const uid = req.query.user
        const thisUser = await user.findByPk(uid);
        
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
    } else {
        //Bad request
    }
    
}

exports.delete = async(req, _res) => {
    return user.destroy({
        where: {
            id: req.query.uid
        }
    });
}

exports.get = async(uid) => {
    return user.findByPk(uid);
}

exports.login = async(username) => {
	const [result, _created] = await user.findOrCreate({where: {username: username}});
	return result
}
