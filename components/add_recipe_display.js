import React, { Component } from 'react';
import { Box, Button, ListItemText, TextField, Chip, Card, CardHeader, CardContent, createTheme, Select, OutlinedInput, MenuItem, InputLabel, FormControl, Stack } from '@mui/material'
import { maxHeight } from '@mui/system';
import { Title } from '@material-ui/icons';
import AddRecipeDescription from './add_recipe_description_comp';
import AddRecipeRestriction from './add_recipe_restrictions_comp';
import AddRecipeTime from './add_recipe_time_comp';
import AddRecipeIngredient from './add_recipe_ingredient_comp';
import AddRecipeInstructions from './add_recipe_instructions_comp';

class AddRecipeDisplay extends Component {
	theme = createTheme({
		overrides: {
			Card: {
                root: {
				    margin: '15px'
                }
			}
		}
	})

    unit = [
        'teaspoon',
        'tablespoon',
        'cup'
    ];

    state = {
        newRecipe: {
            "title": "",
            "directions": [],
            "ingredients": [{
                unit: "",
                quantitiy: 0,
                name: ""
            }],
            "equipment": [],
            "description": "",
            "tags": [],
            "time": 0
        }
    }

    handleUpdateTime(newTime) {
        let setTime = JSON.parse(JSON.stringify(this.state.newRecipe));
        setTime.time = newTime;
        this.setState({newRecipe: setTime});
    }

    handleAddIngredient() {
        let addIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        addIngredient.ingredients.push({
            unit: "",
            quantitiy: 0,
            name: ""
        });
        this.setState({newRecipe: addIngredient});
    }

    handleDeleteIngredient(index) {
        let delIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        if (index > -1) {
            delIngredient.ingredients.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({newRecipe: delIngredient});
    }

    handleUpdateIngredientName(ingredient, index) {
        let updatedIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedIngredient.ingredients[index].name = ingredient;
        this.setState({newRecipe: updatedIngredient});
    }

    handleUpdateIngredientUnit(unit, index) {
        let updatedIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedIngredient.ingredients[index].unit = unit;
        this.setState({newRecipe: updatedIngredient});
    }

    handleUpdateIngredientQuantity(quantitiy, index) {
        let updatedIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedIngredient.ingredients[index].quantity = quantitiy;
        this.setState({newRecipe: updatedIngredient});
    }

    handleUpdateDescription(description) {
        let updatedRecipe = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedRecipe.description = description;
        this.setState({newRecipe: updatedRecipe});
    }

    handleUpdateRestrictions(tags) {
        let updatedTags = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedTags.tags = typeof tags === 'string' ? tags.split(',') : tags;
        this.setState({newRecipe: updatedTags});
    }

    async addRecipe(request) {
        const response = await fetch(`http://localhost:3000/api/recipes`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'User-Agent': '*',
                },
                body: JSON.stringify(request)
            });
        console.log(response);
    }

    render() { 
        return (
            <Box
            classes="wide-text"
            >
                <Card>
                    <CardHeader title="Recipe Name"/>
                    <CardContent>
                        <TextField
                            label="Title" 
                            fullWidth
                        />
                    </CardContent>
                </Card>
                <Box sx={{display:'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                    <Box>
                        <AddRecipeDescription
                            handleChange={this.handleUpdateDescription.bind(this)}
                        />
                        <AddRecipeRestriction
                            handleChange={this.handleUpdateRestrictions.bind(this)}
                            state={this.state}
                            restrictions={this.props.restrictions}
                        />
                    </Box>
                    <Box>
                        <AddRecipeTime
                            handleChange={this.handleUpdateTime.bind(this)}
                        />
                        <AddRecipeIngredient
                            handleAdd={this.handleAddIngredient.bind(this)}
                            handleDelete={this.handleDeleteIngredient.bind(this)}
                            handleName={this.handleUpdateIngredientName.bind(this)}
                            handleUnit={this.handleUpdateIngredientUnit.bind(this)}
                            handleQuantity={this.handleUpdateIngredientQuantity.bind(this)}
                            ingredients={this.props.ingredients}
                            state={this.state}
                            unit={this.unit}
                        />
                        <AddRecipeInstructions/>
                    </Box>
                </Box>
                <Button variant='contained'>Submit</Button>
            </Box>
        );
    }
}

export default AddRecipeDisplay;