import { Card, CardContent, CardHeader, TextField } from '@mui/material';
import React, { Component } from 'react';

class AddRecipeDescription extends Component {
    render() { 
        return (
            <Card>
                <CardHeader title="Description"/>
                <CardContent>
                    <TextField
                        required
                        label="Description"
                        fullWidth
                        multiline
                        rows={5}
                        onChange={(event) => this.props.handleChange(event.target.value)}
                    />
                </CardContent>
            </Card>
        );
    }
}
 
export default AddRecipeDescription;