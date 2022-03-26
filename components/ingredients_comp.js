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
		console.log("event")
		console.log(event)
		console.log("value")
		console.log(value)
		
		if(!props.ingredients.some(ingredient => ingredient.title == value)){
			// save to ingredients and to user
			console.log("storing ingredient")
			await fetch(`/api/ingredients`, {method: 'POST', body: JSON.stringify({price: 0, name: value})})
				.then((res) => res.json())
				.then((data) => {
					const id = data[0].id
					console.log(id)
					fetch(`/api/user/${uid}`, 
						{
							method: 'PUT',
							body: JSON.stringify({ingredients: id})
						}
					).then(() =>
						{
							console.log('stored ingredient-user relation')
							setIngredients(ingredients.concat([{id: id, name: value}]))
							setMyIngredients(myIngredients.concat([{id:id, title: value}]))
							setDropdownList(getDropdownList())
						}
					)
				})
		}else{
			await fetch(`/api/user/${uid}`, 
				{
					method: 'PUT',
					body: {ingredient: value.id}
				}
			)
			setMyIngredients(myIngredients.concat([value]))
			setDropdownList(getDropdownList())
		}
		// todo: check if the request was successful
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
