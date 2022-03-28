import { Card, CardContent, CardHeader, TextField } from '@mui/material';
import React, { Component } from 'react';

class AddRecipeInstructions extends Component {
    render() { 
        return (
            <Card>
                <CardHeader title="Time"/>
                <CardContent>
                    <TextField
                        label="Total Minutes" 
                        type="number"
                        onChange={(event) => this.props.handleChange(event.target.value)}
                    />
                </CardContent>
            </Card>
        );
    }
}
 
export default AddRecipeInstructions;