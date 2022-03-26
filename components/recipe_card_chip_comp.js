import React, { Component } from 'react';
import { Card, CardHeader, CardContent, List, Chip } from '@mui/material';

class RecipeCardChip extends Component {
    render() { 
        return (
            <Card>
                <CardHeader title={this.props.title} />
                <CardContent>
                    <List>
                        {this.props.list.map( chip => 
                            <Chip key={chip} label={chip} />
                        )}
                    </List>
                </CardContent>
            </Card>
        );
    }
}
 
export default RecipeCardChip;