import React, { Component } from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemIcon, Stack } from '@mui/material';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';

class RecipeCardList extends Component {
    render() { 
        return (
            <>
                <Card>
                    <CardHeader title={this.props.title} />
                    <CardContent>
                        <List>
                            {this.props.list.map( listItem =>
                                <ListItem key={listItem}>
                                    <ListItemIcon>
                                        <NoiseControlOffIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={listItem} />
                                </ListItem>
                            )}
                        </List>
                    </CardContent>
                </Card>
            </>
        );
    }
}
 
export default RecipeCardList;