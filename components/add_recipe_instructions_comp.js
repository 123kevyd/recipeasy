import { Button, Card, CardContent, CardHeader, TextField } from '@mui/material';
import React, { Component } from 'react';

class AddRecipeInstructions extends Component {
    render() { 
        return (
            <Card>
                <CardHeader title="Directions"/>
                <CardContent>
                    {this.props.state.newRecipe.directions.map((direction, index)=>{
                        return (
                            <>
                                <TextField
                                    label="Content"
                                    fullWidth
                                    onChange={(event) => this.props.handleContent(event.target.value, index)}
                                />
                                {this.props.state.newRecipe.directions.length > 1 && (
                                    <Button variant='contained' onClick={() => this.props.handleDelete(index)}>Delete</Button>
                                )}
                                {this.props.state.newRecipe.directions.length - 1 === index && (
                                    <Button variant='contained' onClick={() => this.props.handleAdd()}>Add Direction</Button>
                                )}
                            </>
                        );
                    })}
                </CardContent>
            </Card>
        );
    }
}
 
export default AddRecipeInstructions;