import { Button, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import React, { Component } from 'react';
import View_Recipe from "./view_recipe"
import View_Add_Recipe from "./view_add_recipes"
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system';

class RecipeTable extends Component {
	state = { 
        recipeOpen: false,
        addRecipeOpen: false,
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
            return this.getStarsFromNum(params.value)
        }},
        { field: 'rating', headerName: 'Rating', width: 140, renderCell: (params) => {
            return this.getStarsFromNum(params.value)
        }},
        { field: 'tags', headerName: 'Tags', minWidth: 300, renderCell: (params) => {
            return this.getTags(params.value)
        }}
    ]

    formatRecipes(recipes) {
        recipes.forEach((recipe) => {
            recipe.key = recipe.id
            recipe.rating = this.getAverageRating(recipe.reviews)
            recipe.difficulty = this.getAverageDifficulty(recipe.reviews)
        })
        return recipes
    }

    getAverageDifficulty(reviews) {
        let sum = 0
        Object.values(reviews).forEach( review => {
            sum += review.difficulty;
        })
        return (sum / reviews.length).toFixed(1)
    }
    getAverageRating(reviews) {
        let sum = 0
        Object.values(reviews).forEach( review => {
            sum += review.rating;
        })
        return (sum / reviews.length).toFixed(1)
    }

    getTags(tags) {
        return <>{tags.map( tag => <Chip key={tag} label={tag} />)}</>
    }

    getStarsFromNum(num) {
        // let numStars = []
        // for (let i = 1; i <= 5; i++) {
        //     if (num >= i)
        //         numStars.push(1)
        //     else
        //         numStars.push(0)
        // }
        // return numStars.map(hasStar => hasStar === 1? <StarIcon key={} /> : <StarBorderIcon />)
        return (
            <>
                {num > 0 ? <StarIcon /> : <StarBorderIcon />}
                {num > 1 ? <StarIcon /> : <StarBorderIcon />}
                {num > 2 ? <StarIcon /> : <StarBorderIcon />}
                {num > 3 ? <StarIcon /> : <StarBorderIcon />}
                {num > 4 ? <StarIcon /> : <StarBorderIcon />}
            </>
        )
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

    handleToggleAdd = () => {
		let addRecipeOpen = this.state.addRecipeOpen
		addRecipeOpen = !addRecipeOpen
        this.setState({addRecipeOpen: addRecipeOpen})
	}


    render() { 
        return (
            <>
                <Button variant='contained' onClick={() => this.handleToggleAdd()}>Add</Button>
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
                <View_Add_Recipe
                    addRecipeOpen={this.state.addRecipeOpen}
                    onToggleAddRecipeView={this.handleToggleAdd}
                />
                    
            </>
        );
    }
}
 
export default RecipeTable;