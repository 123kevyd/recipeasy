import React, { Component } from 'react';
import { Typography, Card, CardContent, Box, Stack, Divider } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import RatingStars from './rating_stars_comp';

class RecipeRatingDisplay extends Component {
    render() { 
        return (
            <Box>
                <Typography
                    align='center'
                    variant="h4"
                >
                    Reviews:
                </Typography>
                { this.props.reviews ?
                    this.props.reviews.map( review => 
                        <Card key={review.id}>
                            <CardContent>
                                <Box sx={{display:'grid', gridTemplateColumns: '250px auto'}}>
                                    <Box>
                                        <Stack direction='row' mb={2}>
                                            <Typography>Rating:&nbsp;&nbsp;&nbsp;</Typography>
                                            <RatingStars stars={review.stars} />
                                        </Stack>
                                        
                                        <Stack direction='row'>
                                            <Typography>Difficulty:&nbsp;</Typography>
                                            <RatingStars stars={review.difficulty} />
                                        </Stack>
                                    </Box>
                                    <Box>
                                        {review.review}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ) : <></>
                }
            </Box>
            );
    }
}
 
export default RecipeRatingDisplay;