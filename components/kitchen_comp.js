import { useEffect } from 'react'
import KitchenCategory from './kitchen_category_comp'
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
			<KitchenCategory
				items={props.ingredients}
				myItems={props.myIngredients}
				title="Ingredients"
				field="ingredients"
				endpoint="ingredients"
			/>
			<KitchenCategory
				items={props.equipment}
				myItems={props.myEquipment}
				title="Equipment"
				field="equipment"
				endpoint="equipment"
			/>
			<KitchenCategory
				items={props.restrictions}
				myItems={props.myRestrictions}
				title="Restrictions"
				field="restrictions"
				endpoint="restrictions"
			/>
			<MyRecipes
				recipes={props.recipes}
				myRecipes={props.myRecipes}
			/>
		</Box>
	)
	return kitchen
}
