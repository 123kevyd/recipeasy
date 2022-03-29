import React, { Component } from 'react';
import { Box, Button, ListItemText, TextField, Chip, Card, CardHeader, CardContent, createTheme, Select, OutlinedInput, MenuItem, InputLabel, FormControl, Stack, Grid } from '@mui/material'
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
            "directions": [{
                content: ""
            }],
            "ingredients": [{
                unit: "",
                quantity: 0,
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

    handleUpdateInstruction(content, index) {
        let updatedInst = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedInst.directions[index].content = content;
        this.setState({newRecipe: updatedInst});
    }

    handleAddInstruction() {
        let addInst = JSON.parse(JSON.stringify(this.state.newRecipe));
        addInst.directions.push({
            content: ""
        });
        this.setState({newRecipe: addInst});
    }

    handleDeleteInstruction(index) {
        let delInst = JSON.parse(JSON.stringify(this.state.newRecipe));
        if (index > -1) {
            delInst.directions.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({newRecipe: delInst});
    }

    handleAddIngredient() {
        let addIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        addIngredient.ingredients.push({
            unit: "",
            quantity: 0,
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

    handleUpdateIngredientQuantity(quantity, index) {
        let updatedIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedIngredient.ingredients[index].quantity = quantity;
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

    printX() {
        console.log(this.state.newRecipe);
    }

    async addRecipe() {
        console.log(this.state.newRecipe);
        /*
        const response = await fetch(`http://localhost:3000/api/recipes`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'User-Agent': '*',
                },
                body: JSON.stringify(this.state.newRecipe)
            });
        console.log(response);
        */
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
                        <AddRecipeInstructions
                            handleAdd={this.handleAddInstruction.bind(this)}
                            handleDelete={this.handleDeleteInstruction.bind(this)}
                            handleContent={this.handleUpdateInstruction.bind(this)}
                            state={this.state}
                        />
                        <Grid item xs={3}>
                            <Card>
                                <CardHeader/>
                                <CardContent>
                                    <Grid container justify="center">
                                        <Button variant='contained' onClick={() => this.addRecipe()}>Submit</Button>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Box>
                    <Box>
                        <AddRecipeTime
                            handleChange={this.handleUpdateTime.bind(this)}
                        />
                        <AddRecipeRestriction
                            handleChange={this.handleUpdateRestrictions.bind(this)}
                            state={this.state}
                            restrictions={this.props.restrictions}
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
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default AddRecipeDisplay;