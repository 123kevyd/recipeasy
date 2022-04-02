import React, { Component } from 'react';
import { Box, Typography, createTheme, Button } from '@mui/material'
import { ThemeProvider } from '@emotion/react';
import RecipeCardList from './recipe_card_list_comp';
import RecipeCardChip from './recipe_card_chip_comp';
import RecipeCardText from './recipe_card_text_comp';
import { userRecipesStore } from '../store/user_recipes';

class RecipeDisplay extends Component {
	theme = createTheme({
		overrides: {
			Card: {
                root: {
				    margin: '15px'
                }
			}
		}
	})

    getIngredientTextArray(ingredients) {
        let toReturn = [];
        ingredients.forEach(element => {
            toReturn.push(`${element.quantity} ${element.unit} ${element.name}`);
        });
        return toReturn;
    }

    render() { 
        return (
            <ThemeProvider theme={this.theme}>
                <Box
					sx={{
						display: 'flex', 
						flexDirection: 'row', 
						justifyContent: 'space-between',
						padding: '15px'
					}}
				>
                    <Typography
                        align='left'
                        variant="h4"
                    >
                        {this.props.recipe.title}
                    </Typography>
					<Button 
						sx={{alignSelf: 'center', paddingTop: '10px'}}
						variant="contained" color='primary'
						onClick="userRecipesStore.addRecipe(this.props.recipe)"
						disabled={userRecipesStore((state) => state.has(this.props.recipe.id)) ? 'true' : undefined}
					>
						Save Recipe
					</Button>
                </Box>
                <Box sx={{display:'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                    <Box>
                        <RecipeCardText title="Description" text={this.props.recipe.description} />
                        <RecipeCardChip title="Tags" list={this.props.recipe.tags} />
                        <RecipeCardList title="Ingredients" list={this.getIngredientTextArray(this.props.recipe.ingredients)} />
                    </Box>
                    <Box>
                        <RecipeCardList title="Equipment" list={this.props.recipe.equipment} />
                        <RecipeCardList title="Directions" list={this.props.recipe.directions} />
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}
 
export default RecipeDisplay;
