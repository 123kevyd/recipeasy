import React, { Component } from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

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
                {this.props.reviews.map( review => 
                    <Card key={review}>
                        <CardContent>
                            <Box sx={{display:'grid', gridTemplateColumns: '141px auto'}}>
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
            );
    }
}
 
export default RecipeRatingDisplay;