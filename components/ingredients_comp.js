import { useState, useEffect } from "react"
import Typography from '@mui/material/Typography'
import EntryDropdown from "./entry_dropdown_comp"
import KitchenList from "./kitchen_list_comp"
import Stack from "@mui/material/Stack"

export default function Ingredients(props) {

	const [ myIngredients, setMyIngredients ] = useState(props.myIngredients)

	const getDropdownList = () => {
		return props.ingredients.filter( ingredient1 => {
			const found = myIngredients.some( ingredient2 =>
				ingredient1.title === ingredient2.title
			)
			return ! found
		})
	}

	const [ dropdownList, setDropdownList ] = useState(getDropdownList())

	const ingredientSelected = (event, value) => {
		setMyIngredients(myIngredients.concat([value]))
		setDropdownList(getDropdownList())
	}

	const deleteIngredient = (ingredient1) => {
		setMyIngredients(myIngredients.filter(ingredient2 => {
			return ingredient1.title !== ingredient2.title
		}))
		setDropdownList(getDropdownList())
	}

	return (
		<Stack spacing={2} sx={{ width: 300, padding: 3, border: '1px blue solid', margin: 3 }}>
			<Typography align="center" variant="h5" component="div">Ingredients</Typography>
			<EntryDropdown
				items={getDropdownList()}
				handler={ingredientSelected}
			/>
			<KitchenList items={myIngredients} delHandler={deleteIngredient}/>
		</Stack>
	)
			
}
