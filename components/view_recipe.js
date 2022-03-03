import React, { Component } from 'react';
import { Dialog, Typography, Box, Card, CardContent, CardHeader, Chip, ListItemText, List, ListItem, Checkbox, ListItemIcon, Icon } from '@mui/material';
import RecipeModalHeader from './recipe_modal_header';
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

class View_Recipe extends Component {
    state = { 
        stepsCompleted: []
     };

    render() { 
        return (
            <>
                <p>test</p>
                <Dialog
                    maxWidth='lg'
                    fullWidth
                    open={this.props.recipeOpen}
                    onClose={() => this.props.onToggleRecipeView()}
                >
                    <>
                        <RecipeModalHeader
                            onToggleModal={this.props.onToggleRecipeView}
                            title="Recipe Viewer"
                        />
                        <Box>
                            <Typography
                                align='center'
                                variant="h4"
                            >
                                {this.props.recipe.title}
                            </Typography>
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
                        </Box>
                        <Box>
                            <Typography
                                align='center'
                                variant="h4"
                            >
                                Reviews:
                            </Typography>
                            {this.props.recipe.reviews.map( review => 
                                <Card key={review}>
                                    <CardContent>
                                        <Box sx={{display:'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                                            <Box>
                                                {review.rating > 0 ? <StarIcon /> : <StarBorderIcon />}
                                                {review.rating > 1 ? <StarIcon /> : <StarBorderIcon />}
                                                {review.rating > 2 ? <StarIcon /> : <StarBorderIcon />}
                                                {review.rating > 3 ? <StarIcon /> : <StarBorderIcon />}
                                                {review.rating > 4 ? <StarIcon /> : <StarBorderIcon />}
                                            </Box>
                                            <Box>
                                                {review.description}
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}
                        </Box>
                    </>
                </Dialog>
            </>
        );
    }
}
 
export default View_Recipe;