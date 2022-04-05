import { Typography, Box, Button, Stack, Card, CardHeader, CardContent } from '@mui/material';
import React, { Component } from 'react';
import RecipeTable from './recipe_table_comp';
import ViewAddRecipe from './view_add_recipes';

class Cookbook extends Component {

	state = { 
        addRecipeOpen: false,
    }

	handleToggleAdd = () => {
		let addRecipeOpen = this.state.addRecipeOpen
		addRecipeOpen = !addRecipeOpen
        this.setState({addRecipeOpen: addRecipeOpen})
	}

	render() { 
		return (
			<>
				<Typography variant='h4' align='center'>My Cookbook <Button variant='contained' onClick={() => this.handleToggleAdd()}>Add</Button></Typography>
				<Box margin='100px'>
					<Box>
						<RecipeTable
							recipes={this.props.recipes}
							ingredients={this.props.ingredients}
							myIngredients={this.props.myIngredients}
							equipment={this.props.equipment}
							myEquipment={this.props.myEquipment}
							restrictions={this.props.restrictions}
							myRestrictions={this.props.myRestrictions}
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
