import { Description } from '@mui/icons-material';
import { Button, Typography, Box } from '@mui/material';
import React, { Component } from 'react';
import View_Recipe from './view_recipe';
import Filter from './filter_comp'
import RecipeTable from './recipe_table_comp';

class Cookbook extends Component {

	tempRecipes = [{
		id: 1,
		title: "HARD Waffles",
		description: "Consider this your new, go-to waffle recipe when you want to start your day off on a sweet note. No fussy steps or unexpected ingredients are required here, which means you can whip these up whenever your cravings hit.",
		time: 30,
		tags: ["Gluten Free", "Vegan", "Fish Free"],
		ingredients: [
			{ name: "all-purpose flour", quantity: 1, unit: "cup"},
			{ name: "sugar", quantity: 2 , unit: "tablespoon"},
			{ name: "baking powder", quantity: 1, unit: "teaspoon"},
			{ name: "salt", quantity: 0.25, unit: "teaspoon"},
			{ name: "milk", quantity: 1, unit: "cup"},
			{ name: "eggs", quantity: 2, unit: "large"},
			{ name: "unslated butter (melted)", quantity: 4, unit: "tablespoon"}
		],
		directions: [
			"Preheat waffle iron according to manufacturer's instructions. In a large bowl, whisk flour, sugar, baking powder, and salt; set aside.",
			"In a small bowl, whisk milk and eggs; pour over flour mixture, and whisk gently to combine (don't overmix). Gently whisk in butter.",
			"Following manufacturer's instructions, cook waffles until deep brown and crisp. (For a standard waffle iron, pour a generous 1/2 cup of batter into center, spreading to within 1/2 inch of edges, and close; waffle will cook in 2 to 3 minutes.) Serve warm, with maple syrup and butter, as desired."
		],
		equipment: ["Waffle Iron", "Whisk"],
		reviews: [
			{ rating: 5, difficulty: 3, description: "Loved this recipe, simple technique, on hand ingredients. My son is a very picky person, tastes all imperfections, and sensitive to over seasoning and sweetness. He loved this waffle and asked me to save the recipe, Which he has never done before" },
			{ rating: 2, difficulty: 5, description: "I would not recommend 2 eggs! One egg is all you need, it took away from the fluffiness and was just too much w 2 I always use just 1, but decided to give 2 a try like the recipe called for, and my family definitely could tell the difference I won't do that again! Unless using 2 cups flour!" },
			{ rating: 3, difficulty: 4, description: "Very easy recipe and it doesn’t make too many. I added approx. 1/4 more cup of flour and into the liquid ingredients I added 1 tsp vanilla. The recipe doesn't specify milk so I used a mix of 2% and whole." }
		]
	}, {
		id: 2,
		title: "Easy Waffles",
		description: "Consider this your new, go-to waffle recipe when you want to start your day off on a sweet note. No fussy steps or unexpected ingredients are required here, which means you can whip these up whenever your cravings hit.",
		time: 30,
		tags: ["Gluten Free", "Vegan", "Fish Free"],
		ingredients: [
			{ name: "all-purpose flour", quantity: 1, unit: "cup"},
			{ name: "sugar", quantity: 2 , unit: "tablespoon"},
			{ name: "baking powder", quantity: 1, unit: "teaspoon"},
			{ name: "salt", quantity: 0.25, unit: "teaspoon"},
			{ name: "milk", quantity: 1, unit: "cup"},
			{ name: "eggs", quantity: 2, unit: "large"},
			{ name: "unslated butter (melted)", quantity: 4, unit: "tablespoon"}
		],
		directions: [
			"Preheat waffle iron according to manufacturer's instructions. In a large bowl, whisk flour, sugar, baking powder, and salt; set aside.",
			"In a small bowl, whisk milk and eggs; pour over flour mixture, and whisk gently to combine (don't overmix). Gently whisk in butter.",
			"Following manufacturer's instructions, cook waffles until deep brown and crisp. (For a standard waffle iron, pour a generous 1/2 cup of batter into center, spreading to within 1/2 inch of edges, and close; waffle will cook in 2 to 3 minutes.) Serve warm, with maple syrup and butter, as desired."
		],
		equipment: ["Waffle Iron", "Whisk"],
		reviews: [
			{ rating: 5, difficulty: 3, description: "Loved this recipe, simple technique, on hand ingredients. My son is a very picky person, tastes all imperfections, and sensitive to over seasoning and sweetness. He loved this waffle and asked me to save the recipe, Which he has never done before" },
			{ rating: 2, difficulty: 1, description: "I would not recommend 2 eggs! One egg is all you need, it took away from the fluffiness and was just too much w 2 I always use just 1, but decided to give 2 a try like the recipe called for, and my family definitely could tell the difference I won't do that again! Unless using 2 cups flour!" },
			{ rating: 3, difficulty: 4, description: "Very easy recipe and it doesn’t make too many. I added approx. 1/4 more cup of flour and into the liquid ingredients I added 1 tsp vanilla. The recipe doesn't specify milk so I used a mix of 2% and whole." }
		]
	}]

	currRecipe = this.tempRecipes[0]

	render() { 
		return (
			<>
				<Typography variant='h4' align='center'>My Cookbook</Typography>
				<Box sx={{display:'grid', gridTemplateColumns: 'auto auto'}}>
					<Box>
						<Filter />
					</Box>
					<Box>
						<RecipeTable recipes={this.tempRecipes} />
					</Box>
				</Box>

				<Button variant="contained" onClick={this.handleToggleRecipe}>Open View Recipe</Button>
			</>
		);
	}
}
 
export default Cookbook;
