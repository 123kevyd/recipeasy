import { Button } from '@mui/material';
import React, { Component } from 'react';
import View_Recipe from './view_recipe';

class Cookbook extends Component {
	state = { recipeOpen: false }

	handleToggleRecipe = () => {
		let recipeOpen = this.state.recipeOpen
		recipeOpen = !recipeOpen
		this.setState({recipeOpen: recipeOpen})
		console.log(this.state.recipeOpen)
	}

	render() { 
		return (
			<>
				<Button variant="contained" onClick={this.handleToggleRecipe}>Open View Recipe</Button>
				<View_Recipe
					onToggleRecipeView={this.handleToggleRecipe}
					recipeOpen={this.state.recipeOpen}
				/>
			</>
		);
	}
}
 
export default Cookbook;
