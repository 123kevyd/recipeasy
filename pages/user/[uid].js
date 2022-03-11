
import { useRouter } from 'next/router'
import { useState } from 'react'
import Kitchen from '../../components/kitchen_comp'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Cookbook from '../../components/cookbook'

let tempRecipes = [{
	id: 1,
	title: "HARD Waffles",
	description: "Consider this your new, go-to waffle recipe when you want to start your day off on a sweet note. No fussy steps or unexpected ingredients are required here, which means you can whip these up whenever your cravings hit.",
	time: 30,
	tags: ["Gluten Free", "Vegan", "Fish Free"],
	ingredients: [
		{ name: "all-purpose flour", quantity: 1, unit: "cup"},
		{ name: "sugar", quantity: 2 , unit: "tablespoon"},
		{ name: "baking powder", quantity: 1, unit: "teaspoon"},
		{ name: "salt", quantity: 0.25, unit: "teaspoon"},
		{ name: "milk", quantity: 1, unit: "cup"},
		{ name: "eggs", quantity: 2, unit: "large"},
		{ name: "unslated butter (melted)", quantity: 4, unit: "tablespoon"}
	],
	directions: [
		"Preheat waffle iron according to manufacturer's instructions. In a large bowl, whisk flour, sugar, baking powder, and salt; set aside.",
		"In a small bowl, whisk milk and eggs; pour over flour mixture, and whisk gently to combine (don't overmix). Gently whisk in butter.",
		"Following manufacturer's instructions, cook waffles until deep brown and crisp. (For a standard waffle iron, pour a generous 1/2 cup of batter into center, spreading to within 1/2 inch of edges, and close; waffle will cook in 2 to 3 minutes.) Serve warm, with maple syrup and butter, as desired."
	],
	equipment: ["Waffle Iron", "Whisk"],
	reviews: [
		{ rating: 5, difficulty: 3, description: "Loved this recipe, simple technique, on hand ingredients. My son is a very picky person, tastes all imperfections, and sensitive to over seasoning and sweetness. He loved this waffle and asked me to save the recipe, Which he has never done before" },
		{ rating: 2, difficulty: 5, description: "I would not recommend 2 eggs! One egg is all you need, it took away from the fluffiness and was just too much w 2 I always use just 1, but decided to give 2 a try like the recipe called for, and my family definitely could tell the difference I won't do that again! Unless using 2 cups flour!" },
		{ rating: 3, difficulty: 4, description: "Very easy recipe and it doesn’t make too many. I added approx. 1/4 more cup of flour and into the liquid ingredients I added 1 tsp vanilla. The recipe doesn't specify milk so I used a mix of 2% and whole." }
	]
}, {
	id: 2,
	title: "Easy Waffles",
	description: "Consider this your new, go-to waffle recipe when you want to start your day off on a sweet note. No fussy steps or unexpected ingredients are required here, which means you can whip these up whenever your cravings hit.",
	time: 30,
	tags: ["Gluten Free", "Vegan", "Fish Free"],
	ingredients: [
		{ name: "all-purpose flour", quantity: 1, unit: "cup"},
		{ name: "sugar", quantity: 2 , unit: "tablespoon"},
		{ name: "baking powder", quantity: 1, unit: "teaspoon"},
		{ name: "salt", quantity: 0.25, unit: "teaspoon"},
		{ name: "milk", quantity: 1, unit: "cup"},
		{ name: "eggs", quantity: 2, unit: "large"},
		{ name: "unslated butter (melted)", quantity: 4, unit: "tablespoon"}
	],
	directions: [
		"Preheat waffle iron according to manufacturer's instructions. In a large bowl, whisk flour, sugar, baking powder, and salt; set aside.",
		"In a small bowl, whisk milk and eggs; pour over flour mixture, and whisk gently to combine (don't overmix). Gently whisk in butter.",
		"Following manufacturer's instructions, cook waffles until deep brown and crisp. (For a standard waffle iron, pour a generous 1/2 cup of batter into center, spreading to within 1/2 inch of edges, and close; waffle will cook in 2 to 3 minutes.) Serve warm, with maple syrup and butter, as desired."
	],
	equipment: ["Waffle Iron", "Whisk"],
	reviews: [
		{ rating: 5, difficulty: 3, description: "Loved this recipe, simple technique, on hand ingredients. My son is a very picky person, tastes all imperfections, and sensitive to over seasoning and sweetness. He loved this waffle and asked me to save the recipe, Which he has never done before" },
		{ rating: 2, difficulty: 1, description: "I would not recommend 2 eggs! One egg is all you need, it took away from the fluffiness and was just too much w 2 I always use just 1, but decided to give 2 a try like the recipe called for, and my family definitely could tell the difference I won't do that again! Unless using 2 cups flour!" },
		{ rating: 3, difficulty: 4, description: "Very easy recipe and it doesn't make too many. I added approx. 1/4 more cup of flour and into the liquid ingredients I added 1 tsp vanilla. The recipe doesn't specify milk so I used a mix of 2% and whole." }
	]
}] //TODO: remove once db val used

const db = require("../../backend/models")
const UserModel = db.user
const EquipmentModel = db.equipment
const IngredientModel = db.ingredient
const RecipesModel = db.recipes
const RestrictionModel = db.restriction
export async function getServerSideProps(context) 
{
	const uid = context.params.uid
	console.log("user id:")
	console.log(uid)
	const user = await UserModel.findByPk(uid)
	console.log(user)
	console.log(Object.getOwnPropertyNames(UserModel).filter(function(p){
		return typeof user[p] === 'function'
	}))
	const ingredients = IngredientModel.findAll()
	const equipment = EquipmentModel.findAll()
	const restrictions = RestrictionModel.findAll()
	const myIngredients = user.getIngredients()
	const myEquipment = user.getEquipment()
	const myRestrictions = user.getRestrictions()

	let recipes = tempRecipes

	return {
		props: {
			ingredients: ingredients,
			myIngredients: myIngredients,
			recipes: recipes, //TODO: Switch to db val
			myRecipes: [],
			equipment: equipment,
			myEquipment: myEquipment,
			restrictions: restrictions,
			myRestrictions: myRestrictions
		}
	}
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
