import { Box, Button, Card, CardContent, CardHeader, TextField } from '@mui/material';
import React, { Component } from 'react';

class AddRecipeInstructions extends Component {
    render() { 
        return (
            <Card>
                <CardHeader title="Directions"/>
                <CardContent>
                    {this.props.directions.map((direction, index)=>{
                        return (
                            <Box key={index}>
                                <TextField
                                    label="Content"
                                    fullWidth
                                    onChange={(event) => this.props.handleContent(event.target.value, index)}
                                />
                                {this.props.directions.length > 1 && (
                                    <Box sx={{ mx: "auto" }}>
                                        <Button variant='contained' onClick={() => this.props.handleDelete(index)}>Delete</Button>
                                    </Box>
                                )}
                                {this.props.directions.length - 1 === index && (
                                    <Box sx={{ mx: "auto" }}>
                                        <Button variant='contained' onClick={() => this.props.handleAdd()}>Add Direction</Button>
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
 
export default AddRecipeInstructions;