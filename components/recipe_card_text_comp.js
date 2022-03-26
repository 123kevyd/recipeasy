import React, { Component } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

class RecipeCardText extends Component {
    render() { 
        return (
            <Card>
                <CardHeader title={this.props.title} />
                <CardContent>
                    <Typography>{this.props.text}</Typography>
                </CardContent>
            </Card>
        );
    }
}
 
export default RecipeCardText;