import React, { Component } from 'react';
import { Box, Card, CardHeader, CardContent, Typography, List, ListItem, ListItemText, Checkbox, Chip, ListItemIcon, createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react';

class RecipeDisplay extends Component {
	theme = createTheme({
		overrides: {
			Card: {
                root: {
				    margin: '15px'
                }
			}
		}
	})

    render() { 
        return (
            <ThemeProvider theme={this.theme}>
                <Box>
                    <Typography
                        align='center'
                        variant="h4"
                    >
                        {this.props.recipe.title}
                    </Typography>
                </Box>
                <Box sx={{display:'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                    <Box>
                        <Card>
                            <CardHeader title='Description:' />
                            <CardContent>
                                <Typography>
                                    {this.props.recipe.description}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader title="Tags" />
                            <CardContent>
                                {this.props.recipe.tags.map(
                                    tag => <Chip key={tag} label={tag} />
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader title="Ingredients" />
                            <CardContent>
                                <List>
                                    {this.props.recipe.ingredients.map( ingredient => 
                                        <ListItem key={ingredient}>
                                            <ListItemText 
                                                primary={ingredient.quantity + " " + ingredient.unit + " " + ingredient.name}
                                            />
                                        </ListItem>
                                    )}
                                </List>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card>
                            <CardHeader title="Equipment" />
                            <CardContent>
                                <List>
                                    {this.props.recipe.equipment.map( equipment =>
                                        <ListItem key={equipment}>
                                            <ListItemText primary={equipment} />
                                        </ListItem>
                                    )}
                                </List>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader title="Directions" />
                            <CardContent>
                                <List>
                                    {this.props.recipe.directions.map( direction =>
                                        <ListItem key={direction}>
                                            <ListItemIcon>
                                                <Checkbox />
                                            </ListItemIcon>
                                            <ListItemText primary={direction} />
                                        </ListItem>    
                                    )}
                                </List>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}
 
export default RecipeDisplay;