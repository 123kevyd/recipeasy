const db = require("../models");
const user = db.user;

async function addToUserList(currUser, uid, listName, id) {
	console.log("adding to list")
	//entry = await user.update({
		//ingredients: JSON.stringify(JSON.parse(currUser[listName]).concat([id])),
		//where: {
			//id: uid
		//}
	//})
	currUser[listName] = JSON.stringify(JSON.parse(currUser[listName]).concat([id]))
	currUser.save()
	console.log("added to list")
}

exports.put = async(req, res) => {
	console.log(req)
    if (req.body && req.query.user) {
        //Body fields exist - updating an existing user's informatio
		const body = JSON.parse(req.body)
		const uid = req.query.user
		console.log(uid)
        const thisUser = await user.findByPk(uid);
		console.log(thisUser)
        var entry = null
		console.log("storing item")
		console.log(body)
        if (body.ingredients) {
			addToUserList(thisUser, uid, "ingredients", body.ingredient)
        }
        if (req.body.equipment) {
			addToUserList(thisUser, uid, "equipment", body.ingredient)
        }
        if (req.body.restrictions) {
			addToUserList(thisUser, uid, "ingredients", body.restrictions)
        }
        if (req.body.recipes) {
			addToUserList(thisUser, uid, "recipes", body.recipes)
        }
        //Model.update only returns an array with the number of rows affected
		return true
		
    //}else if (req.body.data.username) {
        //entry = await user.findOne({
            //where: {
                //username: req.body.data.username
            //}
        //})

        //if (!entry) {
            //entry = await user.create({username: req.body.data.username});
        //}

        //return entry;
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

exports.login = async(req, res) => {
	const [result, created] = await user.findOrCreate({where: {username: req.query.user}});
	return result
}
