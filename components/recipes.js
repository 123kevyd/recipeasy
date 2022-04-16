import { useState } from "react"
import { Typography, Stack, List, ListItem, ListItemButton, LinearProgress } from '@mui/material/'
import { userStore } from "../store/user_store"
import DelButton from "./del_button"
import ViewRecipe from "./view_recipe"

export default function Recipes(_props) {
	return (
		<Stack spacing={2} sx={{ width: 300, padding: 3, border: '1px blue solid', margin: 3 }}>
			<Typography align="center" variant="h5" component="div">Saved Recipes</Typography>
			<KitchenRecipeList/>
		</Stack>
	)
			
}

function RecipeListItem(props) {
	const recipe = props.recipe
	const isLoading = props.isLoading
	const del = userStore(state => state.del)
	return (
		<ListItem
			secondaryAction={
				<DelButton 
					disabled={isLoading}
					onClick={() => del("recipes", recipe)}
					item={recipe}
					/>
			}
		>
			<ListItemButton
				onClick={() => {props.handleViewClick(recipe)}}
				sx={{color: isLoading ? 'text.disabled' : 'black'}}
			>
				{ recipe.title }
			</ListItemButton>
		</ListItem>
	)
}

function KitchenRecipeList(_props) {
	const items = userStore((state) => state.recipes)
	const loading = userStore((state) => state.loading)
	const [currRecipe, setCurrRecipe] = useState(items[0])
	const [viewingRecipe, setViewingRecipe] = useState(false)
	const toggleViewingRecipe = () => {
		setViewingRecipe(!viewingRecipe)
	}
	const viewClick = (recipe) => {
		setCurrRecipe(recipe)
		toggleViewingRecipe()
	}

	const listItems = (
		items.map(item => {
			const loadingElement = item
			var isLoading = loading.has(loadingElement)
			return (
				<div key={`${item.title}${isLoading}`}>
					<RecipeListItem
						recipe={item}
						isLoading={isLoading}
						handleViewClick={viewClick}
					/>
					{ isLoading && <LinearProgress sx={{marginBotton: '-4px'}} />}
				</div>
			)
		})
	)

	if( items.length > 0 ) {
		return (
			<div>
				<List dense={true}>
					{listItems}
				</List>
				<ViewRecipe
						onToggleRecipeView={toggleViewingRecipe}
						recipeOpen={viewingRecipe}
						recipe={currRecipe}
				/>
			</div>
		)
	} else {
		return (
			<Typography>No recipes saved.</Typography>
		)
	}

}

