import React, { Component } from 'react';
import { Box, Button, ListItemText, TextField, Chip, ListItemIcon, createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react';
import { recipe } from '../backend/models';
//const Recipe = require ("../../backend/controllers/recipe_controller.js");
const Recipe = require ("../pages/api/recipe.js");

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

    formatAddRequest() {
        return {
            "body": {
                "data": {
                    "name": "testRecipe",
                    "instructions": "Whisk the thing",
                    "ingredients": ["egg"],
                    "equipment": ["whisk"],
                    "servings": 3,
                    "details": null,
                    "author": "edmundTesting"
                }
            }
        }
    }

    addRecipe(request) {
        recipe.handler(request);
    }

    render() { 
        return (
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    />
                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    />
                    <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    />
                    <TextField
                    id="outlined-number"
                    label="Number"
                    />
                    <TextField id="outlined-search" label="Search field" type="search" />
                    <TextField
                    id="outlined-helperText"
                    label="Ingredients"
                    />
                </div>
                <Button variant='contained' onClick={() => this.addRecipe(this.formatAddRequest())}>Submit</Button>
            </Box>
        );
    }
}

export default AddRecipeDisplay;