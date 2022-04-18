import { Typography, Box, Button } from '@mui/material';
import React, { Component } from 'react';
import RecipeTableHOC from './recipe_table_HOC';
import ViewAddRecipe from './view_add_recipes';

class Cookbook extends Component {
	state = {
        addRecipeOpen: false
    }

	handleToggleAdd = () => {
		let addRecipeOpen = this.state.addRecipeOpen
		addRecipeOpen = !addRecipeOpen
        this.setState({addRecipeOpen: addRecipeOpen})
	}

	render() {
		return (
			<>
				<p>{this.state.useIngredientFilter}</p>
				<p>{this.state.useEquipmentFilter}</p>
				<p>{this.state.useRestrictionFilter}</p>
				<p>{this.state.useRecipesFilter}</p>
				<Typography variant="h4" align="center">My Cookbook <Button id="addRecipeButton" variant="contained" onClick={() => this.handleToggleAdd()}>Add</Button></Typography>
				<Box marginLeft="100px" marginRight="100px">
					<Box>
						<RecipeTableHOC
							recipes={this.props.recipes}
							ingredients={this.props.ingredients}
							equipment={this.props.equipment}
							restrictions={this.props.restrictions}
						/>
						<ViewAddRecipe
							addRecipeOpen={this.state.addRecipeOpen}
							onToggleAddRecipeView={this.handleToggleAdd}
							recipes={this.props.recipes}
							ingredients={this.props.ingredients}
							equipment={this.props.equipment}
							restrictions={this.props.restrictions}
						/>
					</Box>
				</Box>
			</>
		);
	}
}

export default Cookbook;
