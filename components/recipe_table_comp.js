import { Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableSortLabel, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'
import React, { Component } from 'react';
import View_Recipe from "./view_recipe"

class RecipeTable extends Component {
	state = { 
        recipeOpen: false,
        currRecipe: this.props.recipes[0],
        shownRecipes: this.formatRecipes(this.props.recipes),
        sortInfo: [
            { colName: "Title", dir: 'asc', active: false },
            { colName: "Time", dir: 'asc', active: false },
            { colName: "Difficulty", dir: 'asc', active: false },
            { colName: "Rating", dir: 'asc', active: false }
        ]
    }

    formatRecipes(recipes) {
        recipes.forEach((recipe) => {
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
        return tags.map( tag => <Chip key={tag} label={tag} />)
    }

	handleToggleRecipe = (recipe) => {
		let recipeOpen = this.state.recipeOpen
		recipeOpen = !recipeOpen
		this.setState({recipeOpen: recipeOpen})
	}

    compareRecipes(a, b, orderBy) {
        if (b[orderBy] < a[orderBy])
            return -1
        if (b[orderBy] > a[orderBy])
            return 1
        return 0
    }

    getCompare (order, orderBy) {
        return order === 'desc' ? (a, b) => this.compareRecipes(a, b, orderBy) : (a, b) => -(this.compareRecipes(a, b, orderBy));
    }

    handleSortChange = (colName) => {
        let sortInfo = JSON.parse(JSON.stringify(this.state.sortInfo))
        let index = -1
        let allRecipes = JSON.parse(JSON.stringify(this.props.recipes))

        sortInfo.forEach((elem, i) => {if (elem.colName === colName) index = i})
        if (!sortInfo[index].active) {
            sortInfo.forEach((elem) => {elem.active = false})
            sortInfo[index].active = true
            sortInfo[index].dir = 'asc'
        } else if (sortInfo[index].dir === "asc") {
            sortInfo.forEach((elem) => {elem.active = false})
            sortInfo[index].active = true
            sortInfo[index].dir = 'desc'
        } else {
            sortInfo.forEach((elem) => {elem.active = false})
        }
        
        allRecipes.sort(this.getCompare(sortInfo[index].dir, sortInfo[index].colName))

        this.setState({sortInfo: sortInfo})
        this.setState({shownRecipes: this.formatRecipes(allRecipes)})
    }

    render() { 
        return (
            <>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.state.sortInfo.map(column =>
                                    <TableCell key={column.colName}>
                                        <TableSortLabel
                                            active={column.active}
                                            direction={column.dir}
                                            onClick={() => this.handleSortChange(column.colName)}
                                        >
                                            {column.colName}
                                        </TableSortLabel>
                                    </TableCell>
                                )}
                                <TableCell>
                                    Tags
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.shownRecipes.map( recipe =>
                                <TableRow key={recipe.id} onClick={(recipe) => this.handleToggleRecipe(recipe)}>
                                    <TableCell>{recipe.title}</TableCell>   
                                    <TableCell>{recipe.time} mins</TableCell>
                                    <TableCell>
                                        { <Stack direction='row'>
                                            <Typography variant='body1'>
                                            {recipe.difficulty}&nbsp;
                                            </Typography>
                                            <StarIcon />
                                        </Stack> }
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction='row'>
                                            <Typography variant='body1'>
                                                {recipe.rating}&nbsp;
                                            </Typography>
                                            <StarIcon />
                                        </Stack>
                                        
                                    </TableCell>
                                    <TableCell>
                                        {this.getTags(recipe.tags)}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
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