
import { useRouter } from 'next/router'
import { useState } from 'react'
import Kitchen from '../../components/kitchen_comp'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Cookbook from '../../components/cookbook'

function filterToUserData(items, idString){
	const ids = new Set(JSON.parse(idString))
	return items.filter((item) => ids.has(item.id))
}

export async function getServerSideProps(context) 
{
	const userCont = require("../../backend/controllers/user_controller")
	const equipmentCont = require("../../backend/controllers/equipment_controller")
	const ingredientCont = require("../../backend/controllers/ingredient_controller")
	const recipeCont = require("../../backend/controllers/recipe_controller")
	//const restriction = require("../../backend/controllers/restriction_controller")
	const uid = context.params.uid
	const userProm = userCont.get(uid)
	const ingredientsProm = ingredientCont.getAll()
	//const restrictions = restriction.getAll()
	const recipesProm = recipeCont.getAll()
	const equipmentProm = equipmentCont.getAll()

	var [user, ingredients, equipment, recipes] = await Promise.all([userProm, ingredientsProm, equipmentProm, recipesProm])
	//var [user, ingredients, equipment] = await Promise.all([userProm, ingredientsProm, equipmentProm])
	ingredients = ingredients.map(function(ingredient) {
		return {id: ingredient.dataValues.id, title: ingredient.dataValues.name}
	})

	equipment = equipment.map(function(equipment) {
		return {id: equipment.dataValues.id, title: equipment.dataValues.name}
	})

	recipes = recipes.map(function(recipes) {
		//Chop off createdAt and updatedAt (Both recipe and ratings) - Date objects cant be serialized as json
		return {id: recipes.dataValues.id,
				title: recipes.dataValues.name,
				description: recipes.dataValues.details,
				time: recipes.dataValues.time,
				tags: JSON.parse(recipes.dataValues.tags),
				ingredients: JSON.parse(recipes.dataValues.ingredients),
				directions: JSON.parse(recipes.dataValues.instructions),
				equipment: JSON.parse(recipes.dataValues.equipment),
				reviews: recipes.dataValues.ratings.map(function(rating) {
					return {
						id: rating.id,
						review: rating.review,
						stars: rating.stars,
						difficulty: rating.difficulty
					}
				})
			}
	})

	for (recipeIndex in recipes) {
		let equipmentList = recipes[recipeIndex].equipment;
		let ingredientList = recipes[recipeIndex].ingredients
		recipes[recipeIndex].equipment = [];
		recipes[recipeIndex].ingredients = [];

		for (let equipmentIndex in equipmentList) {
			let equipEntry = equipment.find(equip => equip.id === equipmentList[equipmentIndex]);
			if (equipEntry) {
				recipes[recipeIndex].equipment.push(equipEntry.title);
			}
		}

		for (let ingredientIndex in ingredientList) {
			let ingredientEntry = ingredients.find(ingredient => ingredient.id === ingredientList[ingredientIndex].id);
			if (ingredientEntry) {
				let formatEntry = {id: ingredientEntry.id, quantity: ingredientList[ingredientIndex].quantity, name: ingredientEntry.title, unit: ingredientList[ingredientIndex].unit};
				recipes[recipeIndex].ingredients.push(formatEntry);
			}
		}
	}


	const myIngredients = filterToUserData(ingredients, user.dataValues.ingredients)
	const myEquipment = filterToUserData(equipment, user.dataValues.equipment)
	//const myRecipes = filterToUserData(recipes, user.dataValues.recipes)
	
	//const myRestrictions = filterToUserData(restrictions, user.restrictions)

	let restrictions = []
	let myRestrictions = []
	//recipes = tempRecipes
	let myRecipes = []

	const result = {
		props: {
			ingredients: ingredients,
			myIngredients: myIngredients,
			recipes: recipes, //TODO: Switch to db val
			myRecipes: myRecipes,
			equipment: equipment,
			myEquipment: myEquipment,
			restrictions: restrictions,
			myRestrictions: myRestrictions
		}
	}

	return result
}



function TabPanel(props)
{
	// https://codesandbox.io/s/x5uvxj?file=/demo.js
	const {value, index, children } = props

	return (
		<div hidden={value !== index}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	)
}

function App(props) {
	const [tab, setTab] = useState(0)
	const router = useRouter()
	const [ingredients, setIngredients] = useState(props.ingredients)
	const [myIngredients, setMyIngredients] = useState(props.myIngredients)
	const [recipes, setRecipes] = useState(props.recipes)
	const [myRecipes, setMyRecipes] = useState(props.myRecipes)
	const [restrictions, setRestrictions] = useState(props.restrictions)
	const [myRestrictions, setMyRestrictions] = useState(props.myRestrictions)
	const [equipment, setEquipment] = useState(props.equipment)
	const [myEquipment, setMyEquipment] = useState(props.myEquipment)
	const uid = router.query.uid

	const handleChange = (event, newValue) => {
		setTab(newValue)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={tab} onChange={handleChange} centered>
					<Tab label="Kitchen" />
					<Tab label="Recipes" />
					<Tab label="Meal Planner" disabled />
				</Tabs>
			</Box>
			<TabPanel value={tab} index={0}>
				<Kitchen 
					ingredients={props.ingredients}
					myIngredients={props.myIngredients}
					equipment={props.equipment}
					myEquipment={props.myEquipment}
					recipes={props.recipes}
					myRecipes={props.myRecipes}
					restrictions={props.restrictions}
					myRestrictions={props.myRestrictions}
					setRestrictions={setRestrictions}
					setMyRestrictions={setMyRestrictions}
					setMyIngredients={setMyIngredients}
					setIngredients={setIngredients}
					setMyEquipment={setMyEquipment}
					setEquipment={setEquipment}
					setMyRecipes={setMyRecipes}
					setRecipes={setRecipes}
				/>
			</TabPanel>
			<TabPanel value={tab} index={1}>
				<Cookbook
					recipes={props.recipes}
				/>
			</TabPanel>
			<TabPanel value={tab} index={0}>
			</TabPanel>
		</Box>
	)
}

export default App
