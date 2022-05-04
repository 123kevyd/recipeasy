import {useRouter} from "next/router"
import {useState} from "react"
import {Tabs, Tab, Box} from "@mui/material/"
import Cookbook from "../../components/cookbook"
import Kitchen from "../../components/kitchen"
import {userStore} from "/store/user_store"

function filterToUserData(items, idString) {
	if (idString) {
		const ids = new Set(JSON.parse(idString))
		return items.filter((item) => ids.has(item.id))
	} else {
		return []
	}
}

export async function getServerSideProps(context) {
	const userCont = require("../../backend/controllers/user_controller")
	const equipmentCont = require("../../backend/controllers/equipment_controller")
	const ingredientCont = require("../../backend/controllers/ingredient_controller")
	const recipeCont = require("../../backend/controllers/recipe_controller")
	const restrictionCont = require("../../backend/controllers/restriction_controller")
	const uid = context.params.uid
	const userProm = userCont.get(uid)
	const ingredientsProm = ingredientCont.getAll()
	const restrictionsProm = restrictionCont.getAll()
	const equipmentProm = equipmentCont.getAll()
	const recipesProm = recipeCont.getAll()

	var [user, ingredients, equipment, restrictions, recipes] = await Promise.all([userProm, ingredientsProm, equipmentProm, restrictionsProm, recipesProm])

	ingredients = ingredients.map(function(ingredient) {
		return {id: ingredient.dataValues.id, title: ingredient.dataValues.name}
	})

	equipment = equipment.map(function(equipmentInner) {
		return {id: equipmentInner.dataValues.id, title: equipmentInner.dataValues.name}
	})
	restrictions = restrictions.map(function(restriction) {
		return {id: restriction.dataValues.id, title: restriction.dataValues.name}
	})

	recipes = recipes.map(function(recipe) {
		//Chop off createdAt and updatedAt (Both recipe and ratings) - Date objects cant be serialized as json
		return {id: recipe.dataValues.id,
				title: recipe.dataValues.name,
				description: recipe.dataValues.details,
				time: recipe.dataValues.time,
				tags: JSON.parse(recipe.dataValues.tags),
				ingredients: JSON.parse(recipe.dataValues.ingredients),
				directions: JSON.parse(recipe.dataValues.instructions),
				equipment: JSON.parse(recipe.dataValues.equipment),
				reviews: recipe.dataValues.ratings.map(function(rating) {
					return {
						id: rating.id,
						review: rating.review,
						stars: rating.stars,
						difficulty: rating.difficulty
					}
				})}
	})

	const ingredientSet = new Map()
	ingredients.forEach(ingredient => ingredientSet.set(ingredient.id, ingredient))
	for (let recipe of recipes) {
		let equipmentList = recipe.equipment;
		let ingredientList = recipe.ingredients
		recipe.equipment = [];
		recipe.ingredients = [];

		for (let equipmentId of equipmentList) {
			let equipEntry = equipment.find(equip => equip.id === equipmentId);

			if (equipEntry) {
				recipe.equipment.push(equipEntry.title);
			}
		}

		for (let ingredient1 of ingredientList) {
			let ingredientEntry = ingredientSet.get(ingredient1.id)
			if (ingredientEntry) {
				let formatEntry = {id: ingredientEntry.id, quantity: ingredient1.quantity, name: ingredientEntry.title, unit: ingredient1.unit};
				recipe.ingredients.push(formatEntry);
			}
		}
	}

	const myIngredients = filterToUserData(ingredients, user.dataValues.ingredients)
	const myEquipment = filterToUserData(equipment, user.dataValues.equipment)
	const myRecipes = filterToUserData(recipes, user.dataValues.recipes)
	const myRestrictions = filterToUserData(restrictions, user.restrictions)

	return {
		props: {
			ingredients: ingredients,
			myIngredients: myIngredients,
			recipes: recipes,
			myRecipes: myRecipes,
			equipment: equipment,
			myEquipment: myEquipment,
			restrictions: restrictions,
			myRestrictions: myRestrictions
		}
	}
}


function TabPanel(props) {
	// https://codesandbox.io/s/x5uvxj?file=/demo.js
	const {value, index, children} = props

	return (
		<div hidden={value !== index}>
			{value === index && (
				<Box sx={{p: 3}}>
					{children}
				</Box>
			)}
		</div>
	)
}

function App(props) {
	const [tab, setTab] = useState(0)
	const router = useRouter()
	const [_ingredients, setIngredients] = useState(props.ingredients)
	const [_recipes, setRecipes] = useState(props.recipes)
	const [_restrictions, setRestrictions] = useState(props.restrictions)
	const [_equipment, setEquipment] = useState(props.equipment)
	const isInitialized = userStore(state => state.isInitialized)
	const init = userStore(state => state.init)

	if (typeof window !== "undefined") {
		// ie. is this code running in the frontend
		if (! isInitialized()) {
			init({
				uid: router.query.uid,
				recipes: props.myRecipes,
				ingredients: props.myIngredients,
				equipment: props.myEquipment,
				restrictions: props.myRestrictions
			})
		}
	}

	const handleChange = (_event, newValue) => {
		setTab(newValue)
	}

	return (
		<Box sx={{width: "100%"}}>
			<Box sx={{borderBottom: 1, borderColor: "divider"}}>
				<Tabs value={tab} onChange={handleChange} centered>
					<Tab label="Kitchen" />
					<Tab label="Recipes" />
					<Tab sx={{display: "none"}} label="Meal Planner" disabled />
				</Tabs>
			</Box>
			<TabPanel value={tab} index={0}>
				<Kitchen
					ingredients={props.ingredients}
					equipment={props.equipment}
					recipes={props.recipes}
					restrictions={props.restrictions}
					setRestrictions={setRestrictions}
					setIngredients={setIngredients}
					setEquipment={setEquipment}
					setRecipes={setRecipes}
				/>
			</TabPanel>
			<TabPanel value={tab} index={1}>
				<Cookbook
					recipes={props.recipes}
					ingredients={props.ingredients}
					equipment={props.equipment}
					restrictions={props.restrictions}
				/>
			</TabPanel>
			<TabPanel value={tab} index={2}>
			</TabPanel>
		</Box>
	)
}

export default App
