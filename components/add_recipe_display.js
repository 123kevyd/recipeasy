import React, { Component } from 'react';
import { Box, Button, ListItemText, TextField, Chip, Card, CardHeader, CardContent, createTheme, Select, OutlinedInput, MenuItem, InputLabel, FormControl, Stack } from '@mui/material'
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

    ingredients = [
        'egg',
        'milk'
    ];

    unit = [
        'teaspoon',
        'tablespoon',
        'cup'
    ];

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
                            <CardHeader title="Time"/>
                            <CardContent>
                                <TextField
                                    label="Total Minutes" 
                                    type="number"
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader title="Ingredients"/>
                            <CardContent>
                                {this.state.newRecipe.ingredients.map((ingredient, index)=>{
                                    return (
                                        <>
                                            <Stack direction="row" spacing={3}>
                                                <Select
                                                    label="Ingredient"
                                                    fullWidth
                                                    onChange={(event) => this.handleUpdateIngredientName(event.target.value,index)}
                                                    value={ingredient.name}
                                                    >
                                                    {this.ingredients.map((ingredient) => (
                                                        <MenuItem
                                                        key={ingredient}
                                                        value={ingredient}
                                                        >
                                                            {ingredient}
                                                        </MenuItem>
                                                    ))}         
                                                </Select>
                                                <Select
                                                    label="Unit"
                                                    fullWidth
                                                    onChange={(event) => this.handleUpdateIngredientUnit(event.target.value, index)}
                                                    value={ingredient.unit}
                                                    >
                                                    {this.unit.map((unit) => (
                                                        <MenuItem
                                                        key={unit}
                                                        value={unit}
                                                        >
                                                            {unit}
                                                        </MenuItem>
                                                    ))}         
                                                </Select>
                                                <TextField
                                                    label="Qnty"
                                                    type="number"
                                                    onChange={(event) => this.handleUpdateIngredientQuantity(event.target.value, index)}
                                                />
                                                <Button variant='contained' onClick={() => this.handleDeleteIngredient(index)}>Delete</Button>
                                            </Stack>
                                            {this.state.newRecipe.ingredients.length - 1 === index && (
                                                <Button variant='contained' onClick={() => this.handleAddIngredient()}>Add Ingredient</Button>
                                            )}
                                        </>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
                <Button variant='contained'>Submit</Button>
            </Box>
        );
    }
}

export default AddRecipeDisplay;