import { useState } from "react"
import { Typography, Stack, List, ListItem, ListItemButton, LinearProgress } from '@mui/material/'
import { userRecipesStore } from "../store/user_recipes"
import DelButton from "./delete_button"
import View_Recipe from "./view_recipe"

export default function Recipes(props) {
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
	return (
		<ListItem
			secondaryAction={
				<DelButton 
					disabled={isLoading}
					onClick={userRecipesStore((state) => state.delRecipe(recipe))}
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

function KitchenRecipeList(props) {
	const items = userRecipesStore((state) => state.recipes)
	const loadingRecipes = userRecipesStore((state) => state.loadingRecipes)
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
			var isLoading = loadingRecipes.includes(item.id)
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
				<View_Recipe
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

