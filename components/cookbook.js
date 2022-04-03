import { Typography, Box } from '@mui/material';
import React, { Component } from 'react';
import RecipeTable from './recipe_table_comp';

class Cookbook extends Component {
	render() { 
		return (
			<>
				<Typography variant='h4' align='center'>My Cookbook</Typography>
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
					</Box>
				</Box>
			</>
		);
	}
}
 
export default Cookbook;
