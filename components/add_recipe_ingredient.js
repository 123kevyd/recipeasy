import { Button, Card, CardContent, CardHeader, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';

class AddRecipeIngredient extends Component {
    render() {
        return (
            <Card>
                <CardHeader title="Ingredients"/>
                <CardContent>
                    {this.props.currIngredient.map((ingredient, index)=>{
                        return (
                            <Box key={index} mt={2}>
                                <Stack direction="row" spacing={3}>
                                    <Select
                                        label="Ingredient"
                                        fullWidth
                                        onChange={(event) => this.props.handleName(event.target.value, index)}
                                        value={ingredient.name}
                                        >
                                        {this.props.ingredients.map(({ title } = ingredient) => (
                                            <MenuItem
                                            key={title}
                                            value={title}
                                            >
                                                {title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Select
                                        label="Unit"
                                        fullWidth
                                        onChange={(event) => this.props.handleUnit(event.target.value, index)}
                                        value={ingredient.unit}
                                        >
                                        {this.props.unit.map((unit) => (
                                            <MenuItem
                                            key={unit}
                                            value={unit}
                                            >
                                                {unit}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <TextField
                                        value={ingredient.quantity}
                                        label="Qnty"
                                        type="number"
                                        onChange={(event) => this.props.handleQuantity(event.target.value, index)}
                                    />
                                    {this.props.currIngredient.length > 1 && (
                                        <Button variant="contained" onClick={() => this.props.handleDelete(index)}>Delete</Button>
                                    )}
                                </Stack>
                                {this.props.currIngredient.length - 1 === index && (
                                    <Box mt={2}>
                                        <Button variant="contained" onClick={() => this.props.handleAdd()}>Add Ingredient</Button>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </CardContent>
            </Card>
        );
    }
}

export default AddRecipeIngredient;
