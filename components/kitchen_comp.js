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
				setItems={props.setIngredients}
				title="Ingredients"
				field="ingredients"
			/>
			<KitchenCategory
				items={props.equipment}
				setItems={props.setEquipment}
				title="Equipment"
				field="equipment"
			/>
			<KitchenCategory
				items={props.restrictions}
				setItems={props.setRestrictions}
				title="Restrictions"
				field="restrictions"
			/>
			<MyRecipes />
		</Box>
	)
	return kitchen
}
