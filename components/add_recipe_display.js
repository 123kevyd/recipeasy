import React, { Component } from 'react';
import { Box, Button, ListItemText, TextField, Chip, ListItemIcon, createTheme } from '@mui/material'

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