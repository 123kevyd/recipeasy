import { useState, useEffect } from "react"
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import EntryDropdown from "./entry_dropdown_comp"
import KitchenList from "./kitchen_list_comp"
import Stack from "@mui/material/Stack"

export default function Ingredients(props) {

	const [ myIngredients, setMyIngredients ] = useState(props.myIngredients)
	const [ ingredients, setIngredients ] = useState(props.ingredients)
	const router = useRouter()
	const uid = router.query.uid

	const getDropdownList = () => {
		return props.ingredients.filter( ingredient1 => {
			const found = myIngredients.some( ingredient2 =>
				ingredient1.title === ingredient2.title
			)
			return ! found
		})
	}

	const [ dropdownList, setDropdownList ] = useState(getDropdownList())

	const ingredientSelected = async (event, value) => {
		if(!props.ingredients.some(ingredient => ingredient.title == value)){
			// save to ingredients and to user
			await fetch(`/api/ingredients`, {method: 'POST', body: JSON.stringify({price: 0, name: value})})
				.then((res) => res.json())
				.then((data) => {
					const id = data[0].id
					var ingIds = myIngredients.map(ingredient => ingredient.id)
					ingIds = ingIds.filter(ingredient => ingredient != null)
					ingIds.push(id)
					fetch(`/api/user/${uid}`, 
						{
							method: 'PUT',
							body: JSON.stringify({ingredients: ingIds})
						}
					).then(() =>
						{
							setIngredients(ingredients.concat([{id: id, name: value}]))
							setMyIngredients(myIngredients.concat([{id:id, title: value}]))
							setDropdownList(getDropdownList())
						}
					)
				})
		}else{
			var ingIds = myIngredients.map(ingredient => ingredient.id)
			ingIds = ingIds.filter(ingredient => ingredient != null)
			ingIds.push(value.id)
			await fetch(`/api/user/${uid}`, 
				{
					method: 'PUT',
					body: {ingredients: ingIds}
				}
			)
			setMyIngredients(myIngredients.concat([value]))
			setDropdownList(getDropdownList())
		}
		// todo: check if the request was successful
	}

	const deleteIngredient = async (ingredient1) => {
		var ingIds = myIngredients.map(ingredient => ingredient.id)
		ingIds.splice(ingIds.findIndex((id) => id == ingredient1.id), 1)
		await fetch(`/api/user/${uid}`, 
			{
				method: 'PUT',
				body: JSON.stringify({ingredients: ingIds})
			}
		)
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
