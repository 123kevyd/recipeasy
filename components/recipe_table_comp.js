import { Button, Card, CardContent, Chip } from '@mui/material';
import React, { Component } from 'react';
import View_Recipe from "./view_recipe"
import View_Add_Recipe from "./view_add_recipes"
import { DataGrid } from '@mui/x-data-grid'
import { Box, Stack } from '@mui/material';
import RatingStars from './rating_stars_comp';
import RecipeFilter from './recipe_filter_comp'

// recipes=recipes.forEach((recipe)=>{if((useIngredientFilter&&myIngredients.forEach((ingredient)=>{return recipe.ingredients.indexOf(ingredient.title)>=0}))&&(useEquipmentFilter&&myIngredients.forEach((equipment)=>{return recipe.equipment.indexOf(equipment.title)>=0}))&&(useIngredientFilter&&myIngredients.forEach((restriction)=>{returnrecipe.tags.indexOf(restriction.title)>=0}))&&(useRestrictionFilter&&myIngredients.forEach((filterRecipe)=>{returnrecipe.recipes.indexOf(filterRecipe.title)>=0}))){recipe.key=recipe.id;recipe.rating=this.getAverageVal(recipe.reviews,'stars');recipe.difficulty=this.getAverageVal(recipe.reviews,'difficulty');}else{toRemove.push(recipes.title)}}).filter((recipe)=>{returntoRemove.indexOf(recipe.title)<-1});

class RecipeTable extends Component {
	state = { 
        recipeOpen: false,
        addRecipeOpen: false,
        currRecipe: this.props.recipes[0],
        shownRecipes: this.formatRecipes(this.props.recipes, false, false, false, false),
		filters: {
			useIngredientFilter: false,
			useEquipmentFilter: false,
			useRestrictionFilter: false,
			useRecipesFilter: false
		}
    }

    myIngredients = [{id: 2, title: "Eggs"}, {id: 3, title: "Flour"}]
    myEquipment = [{id:1, title: "Wok"}]
    myRestrictions = [{id: 1, title: "A new tag "}, {id:2, title: "Fish Free"}]
    myRecipes = [{id:5, title:"first test recipe"}]
    
    cols = [
        { field: 'key', headerName: 'Open Recipe', width: 105, sortable: false, renderCell: (params) => {
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
		let newFilters = {...this.state.filters}
		newFilters[modalName] = !newFilters[modalName]
		this.setState({ filters: newFilters })

        let shownRecipes = this.formatRecipes(this.props.recipes, newFilters.useIngredientFilter, newFilters.useEquipmentFilter, newFilters.useRestrictionFilter, newFilters.useRecipesFilter);
        this.setState({shownRecipes: shownRecipes})
	}

    formatRecipes(recipes, useIngredientFilter, useEquipmentFilter, useRestrictionFilter, useRecipesFilter) {
        let toRemove = []
        let shownRecipes = [...recipes]

        function checkRecipeArray(filterBool, filterList, recipe, fieldName, compFunc) {
            let toRemoveTitle = null
            if (filterBool) {
                filterList.forEach( (elem) => {
                    if ( !toRemoveTitle && !recipe[fieldName].find((item) => { return compFunc(item, elem) })) {
                        toRemoveTitle = recipe.title
                    }
                })
            }
            return toRemoveTitle
        }

        function checkRecipeTitle(recipe, myRecipes) {
            let toRemoveTitle = null
            if (useRecipesFilter) {
                myRecipes.forEach( (elem) => {
                    if ( !toRemoveTitle && recipe.title !== elem.title) {
                        toRemoveTitle = recipe.title
                    }
                })
            }
            return toRemoveTitle
        }

        shownRecipes.forEach((recipe) => {
            let toRemoveTitle = null
            recipe.key = recipe.id
            recipe.rating = this.getAverageVal(recipe.reviews, 'stars')
            recipe.difficulty = this.getAverageVal(recipe.reviews, 'difficulty')

            toRemoveTitle = checkRecipeArray(useIngredientFilter, this.myIngredients, recipe, "ingredients", (elem2, elem) => { return elem.title === elem2.name })
            if (!toRemoveTitle) {
                toRemoveTitle = checkRecipeArray(useEquipmentFilter, this.myEquipment, recipe, "equipment", (elem2, elem) => { return elem.title === elem2 })
            } if (!toRemoveTitle) {
            toRemoveTitle = checkRecipeArray(useRestrictionFilter, this.myRestrictions, recipe, "tags", (elem2, elem) => { return elem.title === elem2 })
            } if (!toRemoveTitle) {
                toRemoveTitle = checkRecipeTitle(recipe, this.myRecipes)
            }

            if (toRemoveTitle) {
                toRemove.push(toRemoveTitle)
            }
        })
        return shownRecipes.filter((recipe) => { return toRemove.indexOf(recipe.title) < 0})
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
							filters={this.state.filters}
							onToggleFilter={this.handleToggleFilter}
                        />
                        <DataGrid style={{ width: '100%', margin: "15px" }}
                            disableColumnFilter
                            disableSelectionOnClick
                            disableColumnMenu
                            rows={this.state.shownRecipes}
                            columns={this.cols} 
                            autoHeight
                        />
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
