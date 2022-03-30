import React, { Component } from 'react';
import { Dialog } from '@mui/material';
import RecipeModalHeader from './recipe_modal_header';
import RecipeDisplay from './recipe_display';
import RecipeRatingDisplay from './recipe_rating_display';
import RecipeRatingSubmit from './recipe_rating_submit';

class View_Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepsCompleted: [],
            reviews: this.props.recipe.reviews
        };
    }

    addReview = (value) => {
        let reviewList = this.props.recipe.reviews;
        reviewList.push(value)
        this.setState({reviews: reviewList})
    } 

    render() { 
        return (
            <Dialog
                maxWidth='lg'
                fullWidth
                open={this.props.recipeOpen}
                onClose={this.props.onToggleRecipeView}
            >
                <>
                    <RecipeModalHeader
                        onToggleModal={this.props.onToggleRecipeView}
                        title="Recipe Viewer"
                    />
                    <RecipeDisplay recipe={this.props.recipe} />
                    <RecipeRatingSubmit recipe={this.props.recipe} addReview={this.addReview}/>
                    <RecipeRatingDisplay reviews={(this.props.recipe !== undefined ? this.props.recipe.reviews : undefined)} />
                </>
            </Dialog>
        );
    }
}
 
export default View_Recipe;