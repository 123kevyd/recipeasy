import { useEffect } from 'react'
import KitchenCategory from './kitchen_category_comp'
import MyRecipes from './my_recipes_comp'
import Box from '@mui/material/Box'

export default function Kitchen(props) {
	const kitchen = (
		<Box sx={{ 
			display: 'inline-flex',
			flexDirection: 'row',
			justifyContent: 'center',
			flexWrap: 'wrap',
			border: '1px solid grey',
			}}>
			<KitchenCategory
				items={props.ingredients}
				myItems={props.myIngredients}
				setItems={props.setIngredients}
				setMyItems={props.setMyIngredients}
				title="Ingredients"
				field="ingredients"
				endpoint="ingredients"
			/>
			<KitchenCategory
				items={props.equipment}
				myItems={props.myEquipment}
				setItems={props.setEquipment}
				setMyItems={props.setMyEquipment}
				title="Equipment"
				field="equipment"
				endpoint="equipment"
			/>
			<KitchenCategory
				items={props.restrictions}
				myItems={props.myRestrictions}
				setItems={props.setRestrictions}
				setMyItems={props.setMyRestrictions}
				title="Restrictions"
				field="restrictions"
				endpoint="restrictions"
			/>
			<MyRecipes />
		</Box>
	)
	return kitchen
}
