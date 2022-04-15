import { Button, Box, Stack, Chip } from '@mui/material';
import React, { Component } from 'react';
import View_Recipe from "./view_recipe"
import { DataGrid } from '@mui/x-data-grid'
import RatingStars from './rating_stars_comp';
import RecipeFilter from './recipe_filter_comp'

class RecipeTable extends Component {
	state = { 
        recipeOpen: false,
        addRecipeOpen: false,
        currRecipe: this.props.recipes[0],
        shownRecipes: this.formatRecipes(this.props.recipes, false, false, false, false),
		filterActive: {
			useIngredientFilter: false,
			useEquipmentFilter: false,
			useRestrictionFilter: false,
			useRecipesFilter: false
		}
    }
    
    cols = [
        { field: 'id', headerName: 'Open Recipe', width: 105, sortable: false, renderCell: (params) => {
            return <Button variant='contained' onClick={() => this.handleToggleRecipe(params.value)}>View</Button>
        }},
        { field: 'title', headerName: 'Recipe Name', width: 280},
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

	handleToggleFilter = (modalName) => {
		let newFilters = {...this.state.filterActive}
		newFilters[modalName] = !newFilters[modalName]
		this.setState({ filterActive: newFilters })

        // updateFilterParams();

        let shownRecipes = this.formatRecipes(this.props.recipes, newFilters.useIngredientFilter, newFilters.useEquipmentFilter, newFilters.useRestrictionFilter, newFilters.useRecipesFilter);
        this.setState({shownRecipes: shownRecipes})
	}

    checkRecipeArray(filterList, recipe, fieldName, compareFunc) {
        let toRemoveId = null

        filterList.forEach( (elem) => {
            if ( !toRemoveId && !recipe[fieldName].find((item) => { return compareFunc(item, elem) })) {
                toRemoveId = recipe.id
            }
        })

        return toRemoveId
    }

    checkRecipeTitle(recipe, myRecipes) {
        let toRemoveId = null
        myRecipes.forEach( (elem) => {
            if ( !toRemoveId && recipe.title !== elem.title) {
                toRemoveId = recipe.id
            }
        })
        return toRemoveId
    }

    formatRecipes(recipes, useIngredientFilter, useEquipmentFilter, useRestrictionFilter, useRecipesFilter) {
        let toRemove = []
        let shownRecipes = [...recipes]


        shownRecipes.forEach((recipe) => {
            let toRemoveId = null
            recipe.rating = this.getAverageVal(recipe.reviews, 'stars')
            recipe.difficulty = this.getAverageVal(recipe.reviews, 'difficulty')

            if (useIngredientFilter) {
                toRemoveId = this.checkRecipeArray(this.props.myIngredients, recipe, "ingredients", (elem2, elem) => { return elem.title === elem2.name })
            } if (!toRemoveId && useEquipmentFilter) {
                toRemoveId = this.checkRecipeArray(this.props.myEquipment, recipe, "equipment", (elem2, elem) => { return elem.title === elem2 })
            } if (!toRemoveId && useRestrictionFilter) {
                toRemoveId = this.checkRecipeArray(this.props.myRestrictions, recipe, "tags", (elem2, elem) => { return elem.title === elem2 })
            } if (!toRemoveId && useRecipesFilter) {
                toRemoveId = this.checkRecipeTitle(recipe, this.props.myRecipes)
            }

            if (toRemoveId) {
                toRemove.push(toRemoveId)
            }
        })
        return shownRecipes.filter((recipe) => { return toRemove.indexOf(recipe.id) < 0})
    }
    
    addReview = (value) => {
        let newReviewRecipe = this.state.currRecipe;
        let shownRecipeUpdate = this.props.recipes.map(recipe => {
            if (recipe.id == newReviewRecipe.id) {
                recipe.reviews.push(value);
            }
            return recipe
        })
        this.setState({shownRecipes: this.formatRecipes(shownRecipeUpdate)})
    }

    getAverageVal(reviews, colName) {
        let sum = 0
        reviews.forEach( review => {
            sum += review[colName];
        })
        if (reviews.length)
            return ((sum / reviews.length).toFixed(1))
        else
            return 0
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

    handleToggleAdd = () => {
		let addRecipeOpen = this.state.addRecipeOpen
		addRecipeOpen = !addRecipeOpen
        this.setState({addRecipeOpen: addRecipeOpen})
	}


    render() {
        return (
            <>
                <Box style={{ width: '100%' }}>
                    <Stack direction="row">
                        <RecipeFilter
                            ingredients={this.props.ingredients}
                            myIngredients={this.props.myIngredients}
                            equipment={this.props.equipment}
                            myEquipment={this.props.myEquipment}
                            restrictions={this.props.restrictions}
                            myRestrictions={this.props.myRestrictions}
							filters={this.state.filterActive}
							onToggleFilter={this.handleToggleFilter}
                        />
                        <div id="recipeTable">
                            <DataGrid style={{ width: '100%', margin: "15px" }}
                                disableSelectionOnClick
                                disableColumnMenu
                                rows={this.state.shownRecipes}
                                columns={this.cols} 
                                autoHeight
                            />
                        </div>
                    </Stack>
                </Box>
                <View_Recipe
                    onToggleRecipeView={this.handleToggleRecipe}
                    recipeOpen={this.state.recipeOpen}
                    recipe={this.state.currRecipe}
                    addReview={this.addReview}
                />
            </>
        );
    }
}
 
export default RecipeTable;
