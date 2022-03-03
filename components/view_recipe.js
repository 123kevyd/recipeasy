import React, { Component } from 'react';
import { Dialog, Typography, Box, Card, CardContent, CardHeader, Chip, ListItemText, List, ListItem, Checkbox, ListItemIcon, Icon } from '@mui/material';
import RecipeModalHeader from './recipe_modal_header';
import RecipeDisplay from './recipe_display';
import RecipeRatingDisplay from './recipe_rating_display';

class View_Recipe extends Component {
    state = { 
        stepsCompleted: []
     };

    render() { 
        return (
            <>
                <p>test</p>
                <Dialog
                    maxWidth='lg'
                    fullWidth
                    open={this.props.recipeOpen}
                    onClose={() => this.props.onToggleRecipeView()}
                >
                    <>
                        <RecipeModalHeader
                            onToggleModal={this.props.onToggleRecipeView}
                            title="Recipe Viewer"
                        />
                        <RecipeDisplay recipe={this.props.recipe} />
                        <RecipeRatingDisplay reviews={this.props.recipe.reviews} />
                    </>
                </Dialog>
            </>
        );
    }
}
 
export default View_Recipe;