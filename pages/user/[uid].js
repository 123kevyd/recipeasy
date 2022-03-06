
import { useRouter } from 'next/router'
import { useState } from 'react'
import Kitchen from '../../components/kitchen_comp'
import Recipes from '../../components/recipes_comp'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

export async function getServerSideProps(context) 
{
	const uid = context.uid
	const ingredients = [
		{ title: 'Milk'}, { title: 'Bread' },  { title: 'Cheddar' },  { title: 'Coffee' },  { title: 'Eggs' }
	]
	const myIngredients = [
		{ title: 'Milk'}
	]
	const restrictions = [
		{ title: 'Gluten Free' }, { title: 'Vegetarian' }, { title: 'Vegan' }, { title: 'Peanut Allergy' }
	]
	const myRestrictions = []
	const equipment = [
		{ title: 'Stove' }, { title: 'Microwave' }, { title: 'Beater' }, { title: 'Cutting Board' }, { title: 'Freezer' }, { title: 'Pressure Cooker' }
	]
	const myEquipment = [
		{ title: 'Stove' }
	]

	return {
		props: {
			ingredients: ingredients,
			myIngredients: myIngredients,
			recipes: [],
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
	const [value, setValue] = useState(0)
	const uid = router.query.uid

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} centered>
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
				<Recipes 
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
			<TabPanel value={value} index={0}>
			</TabPanel>
		</Box>
	)
}

export default App
