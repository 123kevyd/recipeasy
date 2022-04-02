import React, { Component } from 'react';
import { Box, Typography, createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react';
import RecipeCardList from './recipe_card_list_comp';
import RecipeCardChip from './recipe_card_chip_comp';
import RecipeCardText from './recipe_card_text_comp';

/**
 * Used to display a recipe for viewing
 * @prop {object} recipe - a recipe object with a:
 *  - string: title
 *  - string: description
 *  - string array: tags
 *  - ingrediant array: ingrediants
 *  - string array: equipment
 *  - string array: instruction
 */

class RecipeDisplay extends Component {
    constructor(props) {
        super(props)

        if (!this.props || !this.props.recipe) {
            throw new Error("Required recipe prop not found");
        } else if (typeof this.props.recipe !== "object" ) {
            throw new Error(`Prop recipe must be an object - Is ${this.props.recipe} (${typeof this.props.recipe}) `);
        } else if (!this.props.recipe.title || typeof this.props.recipe.title !== "string") {
            throw new Error(`Prop recipe.title must be a string - Is ${this.props.recipe.title} (${typeof this.props.recipe.title}) `);
        } else if (!this.props.recipe.description || typeof this.props.recipe.description !== "string") {
            throw new Error(`Prop recipe.description must be a string - Is ${this.props.recipe.description} (${typeof this.props.recipe.description}) `);
        } else if (!this.props.recipe.time || typeof this.props.recipe.time !== "number") {
            throw new Error(`Prop recipe.description must be a string - Is ${this.props.recipe.time} (${typeof this.props.recipe.time}) `);
        } else if (!this.props.recipe.tags || typeof this.props.recipe.tags !== "object" && Array.isArray(this.props.recipe.tags)) {
            throw new Error(`Prop recipe.tags must be an array - Is ${this.props.recipe.tags} (${typeof this.props.recipe.tags}) `);
        } else if (!this.props.recipe.ingredients || typeof this.props.recipe.ingredients !== "object" && Array.isArray(this.props.recipe.ingredients)) {
            throw new Error(`Prop recipe.ingredients must be an array - Is ${this.props.recipe.ingredients} (${typeof this.props.recipe.ingredients}) `);
        } else if (!this.props.recipe.equipment || typeof this.props.recipe.equipment !== "object" && Array.isArray(this.props.recipe.equipment)) {
            throw new Error(`Prop recipe.equipment must be an array - Is ${this.props.recipe.equipment} (${typeof this.props.recipe.equipment}) `);
        } else if (!this.props.recipe.directions || typeof this.props.recipe.directions !== "object" && Array.isArray(this.props.recipe.directions)) {
            throw new Error(`Prop recipe.equipment must be an array - Is ${this.props.recipe.directions} (${typeof this.props.recipe.directions}) `);
        }
    }

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
                <Box>
                    <Typography
                        align='center'
                        variant="h4"
                    >
                        {this.props.recipe.title}
                    </Typography>
                    <Typography align='center'>Time - {this.props.recipe.time} mins</Typography>
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