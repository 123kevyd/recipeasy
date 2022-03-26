import { useState, useEffect } from "react"
import Typography from '@mui/material/Typography'
import EntryDropdown from "./entry_dropdown_comp"
import KitchenList from "./kitchen_list_comp"
import Stack from "@mui/material/Stack"

export default function Recipes(props) {
	const [ myRecipes, setMyRecipes ] = useState(props.myRecipes)

	const getDropdownList = () => {
		return props.recipes.filter( recipe1 => {
			const found = myRecipes.some( recipe2 =>
				recipe1.title === recipe2.title
			)
			return ! found
		})
	}

	const [ dropdownList, setDropdownList ] = useState(getDropdownList())

	const recipeSelected = (event, value) => {
		setMyRecipes(myRecipes.concat([value]))
		setDropdownList(getDropdownList())
	}

	const deleteRecipe = (recipe1) => {
		setMyRecipes(myRecipes.filter(recipe2 => {
			return recipe1.title !== recipe2.title
		}))
		setDropdownList(getDropdownList())
	}

	return (
		<Stack spacing={2} sx={{ width: 300, padding: 3, border: '1px blue solid', margin: 3 }}>
			<Typography align="center" variant="h5" component="div">Saved Recipes</Typography>
			<EntryDropdown
				disabled={true}
				items={getDropdownList()}
				handler={recipeSelected}
			/>
			<KitchenList items={myRecipes} delHandler={deleteRecipe}/>
		</Stack>
	)
			
}
