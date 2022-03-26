import { Typography, Box } from '@mui/material';
import React, { Component } from 'react';
import RecipeTable from './recipe_table_comp';

class Cookbook extends Component {
	test() { return 1 }

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
