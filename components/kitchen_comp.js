import Ingredients from './ingredients_comp'
import Restrictions from './restrictions_comp'
import Equipment from './equipment_comp'
import MyRecipes from './my_recipes_comp'
import Box from '@mui/material/Box'
export default function Kitchen(props) {
	const kitchen = (
		<Box sx={{ 
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			border: '1px solid grey',
			}}>
			<Ingredients
				ingredients={props.ingredients}
				myIngredients={props.myIngredients}
			/>
			<Equipment
				equipment={props.equipment}
				myEquipment={props.myEquipment}
			/>
			<Restrictions
				restrictions={props.restrictions}
				myRestrictions={props.myRestrictions}
			/>
			<MyRecipes
				myRecipes={props.myRecipes}
			/>
		</Box>
	)
	return <div />
}
