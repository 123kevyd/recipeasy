import { Button, Chip } from '@mui/material';
import React, { Component } from 'react';
import View_Recipe from "./view_recipe"
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system';
import RatingStars from './rating_stars_comp';

class RecipeTable extends Component {
	state = { 
        recipeOpen: false,
        currRecipe: this.props.recipes[0],
        shownRecipes: this.formatRecipes(this.props.recipes)
    }

    cols = [
        { field: 'key', headerName: 'View Recipe', width: 100, renderCell: (params) => {
            return <Button variant='contained' onClick={() => this.handleToggleRecipe(params.value)}>View</Button>
        }},
        { field: 'title', headerName: 'Recipe Name', width: 300},
        { field: 'time', headerName: 'Time', width: 80, valueFormatter: (params) => {
            return '' + params.value + " mins"
        }},
        { field: 'difficulty', headerName: 'Difficulty', width: 140, renderCell: (params) => {
            return <RatingStars stars={parseFloat(params.value)} />
        }},
        { field: 'rating', headerName: 'Rating', width: 140, renderCell: (params) => {
            return <RatingStars stars={parseFloat(params.value)} />
        }},
        { field: 'tags', headerName: 'Tags', minWidth: 300, renderCell: (params) => {
            return this.getTags(params.value)
        }}
    ]

    formatRecipes(recipes) {
        recipes.forEach((recipe) => {
            recipe.key = recipe.id
            recipe.rating = this.getAverageVal(recipe.reviews, 'rating')
            recipe.difficulty = this.getAverageVal(recipe.reviews, 'difficulty')
        })
        return recipes
    }

    getAverageVal(reviews, colName) {
        let sum = 0
        reviews.forEach( review => {
            sum += review[colName];
        })
        return ((sum / reviews.length).toFixed(1))
    }

    getTags(tags) {
        return <>{tags.map( tag => <Chip key={tag} label={tag} />)}</>
    }

	handleToggleRecipe = (key) => {
		let recipeOpen = this.state.recipeOpen
		recipeOpen = !recipeOpen
        if (recipeOpen) {
            let currRecipe = this.state.shownRecipes.find((elem) => {return elem.id === key})
            this.setState({currRecipe: currRecipe})
        }
        this.setState({recipeOpen: recipeOpen})
	}

    render() { 
        return (
            <>
                <Box style={{ width: '100%' }}>
                    <DataGrid
                        rows={this.state.shownRecipes}
                        columns={this.cols} 
                        autoHeight
                        />
                </Box>
                <View_Recipe
                    onToggleRecipeView={this.handleToggleRecipe}
                    recipeOpen={this.state.recipeOpen}
                    recipe={this.state.currRecipe}
                />
            </>
        );
    }
}
 
export default RecipeTable;
