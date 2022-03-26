import React, { Component } from 'react';
import { Box, Button, ListItemText, TextField, Chip, Card, CardHeader, CardContent, createTheme, Select, OutlinedInput, MenuItem, InputLabel, FormControl } from '@mui/material'
import AddRecipeIngredients from './add_recipe_ingredients'
import { maxHeight } from '@mui/system';

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
    
    restrictions = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    /*
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
    */
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
                <TextField
                    required
                    label="Recipe Name"
                    fullWidth
                />
                <Box sx={{display:'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                    <Box>
                        <Card>
                            <CardHeader title="Description"/>
                            <CardContent>
                                <TextField
                                    required
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    onChange={(event) => this.handleUpdateDescription(event.target.value)}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader title="Restrictions"/>
                            <CardContent>   
                                <FormControl fullWidth>
                                    <InputLabel id="restriction-label">Tags</InputLabel>
                                    <Select
                                        labelId='restriction-label'
                                        MenuProps = {{
                                            PaperProps: {
                                            style: {
                                                maxHeight: 180,
                                                width: 250
                                            }
                                            }
                                        }}
                                        fullWidth
                                        multiple
                                        onChange={(event) => this.handleUpdateRestrictions(event.target.value)}
                                        value={this.state.newRecipe.tags}
                                        input={<OutlinedInput label="Chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                            </Box>
                                        )}>
                                        {this.restrictions.map((restriction) => (
                                            <MenuItem
                                            key={restriction}
                                            value={restriction}
                                            >
                                                {restriction}
                                            </MenuItem>
                                        ))}        
                                    </Select>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card>
                            <CardHeader title="Restrictions"/>
                            <CardContent>
                                {this.state.ingredients.map((ingredient)=>{
                                    return (
                                        <>
                                        <Select>
                                        </Select>
                                        
                                        
                                        </>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
                <TextField
                    label="Total Servings" 
                    type="number"
                />
                <AddRecipeIngredients></AddRecipeIngredients>
                <Button variant='contained'>Submit</Button>
            </Box>
        );
    }
}

export default AddRecipeDisplay;