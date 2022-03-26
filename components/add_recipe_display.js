import React, { Component } from 'react';
import { Box, Button, ListItemText, TextField, Chip, ListItemIcon, createTheme } from '@mui/material'
import AddRecipeIngredients from './add_recipe_ingredients'

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

    ingredients = [
		{ name: "all-purpose flour", quantity: 1, unit: "cup"},
		{ name: "sugar", quantity: 2 , unit: "tablespoon"},
		{ name: "baking powder", quantity: 1, unit: "teaspoon"},
		{ name: "salt", quantity: 0.25, unit: "teaspoon"},
		{ name: "milk", quantity: 1, unit: "cup"},
		{ name: "eggs", quantity: 2, unit: "large"},
		{ name: "unslated butter (melted)", quantity: 4, unit: "tablespoon"}
	];

    ingUnit = [
        "cup",
        "tablespoon",
        "teaspoon"
    ]

    formatAddRequest() {
        return {
            "data": {
                "name": "testRecipe",
                "instructions": "Whisk the thing",
                "ingredients": ["egg"],
                "equipment": ["whisk"],
                "servings": 3,
                "details": null,
                "author": 1
            }
            
        }
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
            component="form"
            sx={{
                width: 1000,
                margin: 2,
                //'& .MuiTextField-root': { m: 1, width: '25ch' },
                maxWidth: '100%'
            }}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Recipe Name"
                        fullWidth
                    />
                    <TextField
                        width = "25"
                        label="Total Servings" 
                        id="outlined-number"
                        margin = "normal"
                        type="number"
                    />
                    <AddRecipeIngredients></AddRecipeIngredients>
                </div>
                <Button variant='contained' onClick={() => this.addRecipe(this.formatAddRequest())}>Submit</Button>
            </Box>
        );
    }
}

export default AddRecipeDisplay;