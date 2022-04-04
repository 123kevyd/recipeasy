import React, { Component, useState } from 'react';
import { Typography, Card, CardContent, CardHeader, Box, Stack, Divider, TextField, Rating, Button, TextareaAutosize } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { styled } from '@mui/material/styles';


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#000000',
    },
    '& .MuiRating-iconHover': {
      color: '#000000',
    },
  });

class RecipeRatingSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: null,
            difficulty: null,
            review: ''
        };
    }

    handleSubmit = () => {
        if (this.props.recipe.id && this.state.rating && this.state.difficulty) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({data: {recipeId: this.props.recipe.id, 
                                            stars: this.state.rating, 
                                            difficulty: this.state.difficulty,
                                            review: this.state.review}})
            }

            fetch('/api/rating', requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.setState({rating: null, difficulty: null, review: ''})
                    this.props.addReview(data[0])
                })

        } else {
            alert('Error: Both difficulty and stars are required');
        }
    }

    render() {
        return (
            <Box>
                <Card>
                    <CardContent>
                        <CardHeader title="Leave Review"/>
                        <Box sx={{display:'grid', gridTemplateColumns: '250px auto'}}> 
                            <Box>
                                <Stack direction='row' mb={2}>
                                    <Typography>Rating:&nbsp;&nbsp;&nbsp;</Typography>
                                    <StyledRating
                                        icon={<StarIcon fontSize="inherit"></StarIcon>}
                                        emptyIcon={<StarBorderIcon fontsize="inherit"></StarBorderIcon>}
                                        value={this.state.rating}
                                        onChange={(event, newValue) => this.setState({rating: newValue})}>
                                    </StyledRating>
                                </Stack>
                                <Stack direction='row'>
                                    <Typography>Difficulty:&nbsp;</Typography>
                                    <StyledRating
                                        icon={<StarIcon fontSize="inherit"></StarIcon>}
                                        emptyIcon={<StarBorderIcon fontsize="inherit"></StarBorderIcon>}
                                        value={this.state.difficulty}
                                        onChange={(event, newValue) => this.setState({difficulty: newValue})}>
                                    </StyledRating>
                                </Stack>
                            </Box>
                            <Box>
                                <Box>
                                    <Stack direction='row' mb={2}>
                                        <TextField
                                        multiline
                                        rows={4}
                                        style={{width: '100%'}}
                                        value={this.state.review}
                                        onChange={(event) => this.setState({review: event.target.value})}/>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        )
    }
}

export default RecipeRatingSubmit;