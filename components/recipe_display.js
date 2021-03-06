import React from "react";
import {Box, Typography, createTheme, Button} from "@mui/material"
import {ThemeProvider} from "@emotion/react";
import RecipeCardList from "./recipe_card_list";
import RecipeCardChip from "./recipe_card_chip";
import RecipeCardText from "./recipe_card_text";
import {userStore} from "../store/user_store";

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

function checkRecipeValues(props) {
	if (!props || !props.recipe) {
		throw new Error("Required recipe prop not found");
	} else if (typeof props.recipe !== "object") {
		throw new Error(`Prop recipe must be an object - Is ${props.recipe} (${typeof props.recipe}) `);
	} else if (!props.recipe.title || typeof props.recipe.title !== "string") {
		throw new Error(`Prop recipe.title must be a string - Is ${props.recipe.title} (${typeof props.recipe.title}) `);
	} else if (!props.recipe.description || typeof props.recipe.description !== "string") {
		throw new Error(`Prop recipe.description must be a string - Is ${props.recipe.description} (${typeof props.recipe.description}) `);
	} else if (!props.recipe.time || typeof props.recipe.time !== "number") {
		throw new Error(`Prop recipe.description must be a string - Is ${props.recipe.time} (${typeof props.recipe.time}) `);
	}
}

function checkRecipeLists(props) {
	if (!props.recipe.tags || typeof props.recipe.tags !== "object" && Array.isArray(props.recipe.tags)) {
		throw new Error(`Prop recipe.tags must be an array - Is ${props.recipe.tags} (${typeof props.recipe.tags}) `);
	} else if (!props.recipe.ingredients || typeof props.recipe.ingredients !== "object" && Array.isArray(props.recipe.ingredients)) {
		throw new Error(`Prop recipe.ingredients must be an array - Is ${props.recipe.ingredients} (${typeof props.recipe.ingredients}) `);
	} else if (!props.recipe.equipment || typeof props.recipe.equipment !== "object" && Array.isArray(props.recipe.equipment)) {
		throw new Error(`Prop recipe.equipment must be an array - Is ${props.recipe.equipment} (${typeof props.recipe.equipment}) `);
	} else if (!props.recipe.directions || typeof props.recipe.directions !== "object" && Array.isArray(props.recipe.directions)) {
		throw new Error(`Prop recipe.equipment must be an array - Is ${props.recipe.directions} (${typeof props.recipe.directions}) `);
	}
}

 export default function RecipeDisplay(props) {
	checkRecipeValues(props)
	checkRecipeLists(props)

	const save = userStore(state => state.add)
	const isSaved = userStore(state => state.has("recipes", props.recipe.id))

	const theme = createTheme({
		overrides: {
			Card: {
                root: {
					margin: "15px"
                }
			}
		}
	})

	const getIngredientTextArray = (ingredients) => {
        let toReturn = [];
        ingredients.forEach(element => {
            toReturn.push(`${element.quantity} ${element.unit} ${element.name}`);
        });
        return toReturn;
    }

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					padding: "15px"
				}}
			>
				<Typography
					align="left"
					variant="h4"
				>
					{props.recipe.title}
				</Typography>
				<Button
					sx={{alignSelf: "center", paddingTop: "10px"}}
					variant="contained" color="primary"
					onClick={() => save("recipes", props.recipe)}
					disabled={isSaved ? "true" : undefined}
				>
					Save Recipe
				</Button>
			</Box>
			<Typography align="left"
				sx={{
					paddingLeft: "15px",
					marginTop: "-40px"
				}}
			>
				{props.recipe.time} mins
			</Typography>
			<Box sx={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
				<Box>
					<RecipeCardText title="Description" text={props.recipe.description} />
					<RecipeCardChip title="Tags" list={props.recipe.tags} />
					<RecipeCardList title="Ingredients" list={getIngredientTextArray(props.recipe.ingredients)} />
				</Box>
				<Box>
					<RecipeCardList title="Equipment" list={props.recipe.equipment} />
					<RecipeCardList title="Directions" list={props.recipe.directions} />
				</Box>
			</Box>
		</ThemeProvider>
	);
}

