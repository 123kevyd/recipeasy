import { Button, Typography, Box } from '@mui/material';
import React, { Component } from 'react';
import Filter from './filter_comp'
import RecipeTable from './recipe_table_comp';

class Cookbook extends Component {
	render() { 
		return (
			<>
				<Typography variant='h4' align='center'>My Cookbook</Typography>
				<Box margin='100px'>
					<Box>
						<RecipeTable recipes={this.props.recipes} />
					</Box>
				</Box>
			</>
		);
	}
}
 
export default Cookbook;
