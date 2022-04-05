import React, { Component } from 'react';
import { Dialog } from '@mui/material';
import RecipeModalHeader from './recipe_modal_header';
import AddRecipeDisplay from './add_recipe_display';

class ViewAddRecipe extends Component {
    state = { 
     };

    render() { 
        return (
            <Dialog
                maxWidth='lg'
                fullWidth
                open={this.props.addRecipeOpen}
                onClose={this.props.onToggleAddRecipeView}
            >
                <>
                    <RecipeModalHeader
                        onToggleModal={this.props.onToggleAddRecipeView}
                        title="Adding Recipe"
                    />
                    <AddRecipeDisplay
                        recipes={this.props.recipes}
                        ingredients={this.props.ingredients}
                        equipment={this.props.equipment}
                        restrictions={this.props.restrictions}
                    />
                </>
            </Dialog>
        );
    }
}
 
export default ViewAddRecipe;