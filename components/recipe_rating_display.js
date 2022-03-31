import React, { Component } from 'react';
import { Typography, Card, CardContent, Box, Stack, Divider } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import RatingStars from './rating_stars_comp';

/**
 * Used to display the review for a recipe
 * @prop {object} reviews - a review object with an array of reviews containing:
 *  - any: id
 *  - number: rating
 *  - number: difficulty
 *  - string: description
 */

class RecipeRatingDisplay extends Component {
    constructor(props) {
        super(props)

        if (!this.props || !this.props.reviews) {
            throw new Error("Required reviews prop not found");
        } else if (typeof this.props.reviews !== "object" || !Array.isArray(this.props.reviews) ) {
            throw new Error(`Prop reviews must be an array - Is ${this.props.reviews} (${typeof this.props.reviews}) `);
        } else if (!this.props.reviews.every((elem) => { return typeof elem.rating === "number"})) {
            throw new Error(`Prop reviews[i].rating must be a number `);
        } else if (!this.props.reviews.every((elem) => { return typeof elem.difficulty === "number"})) {
            throw new Error(`Prop reviews[i].difficulty must be a number `);
        } else if (!this.props.reviews.every((elem) => { return typeof elem.description === "string"})) {
            throw new Error(`Prop reviews[i].description must be a number `);
        }
    }

    render() { 
        return (
            <Box>
                <Typography
                    align='center'
                    variant="h4"
                >
                    Reviews:
                </Typography>
                { this.props.reviews.map( review => console.log(review.id + "|" + review.rating + "|" + review.difficulty);
                        <Card key={review.id}>
                            <CardContent>
                                <Box sx={{display:'grid', gridTemplateColumns: '250px auto'}}>
                                    <Box>
                                        <Stack direction='row' mb={2}>
                                            <Typography>Rating:&nbsp;&nbsp;&nbsp;</Typography>
                                            <RatingStars stars={review.rating} />
                                        </Stack>
                                        
                                        <Stack direction='row'>
                                            <Typography>Difficulty:&nbsp;</Typography>
                                            <RatingStars stars={review.difficulty} />
                                        </Stack>
                                    </Box>
                                    <Box>
                                        {review.description}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    )
                }
            </Box>
            );
    }
}
 
export default RecipeRatingDisplay;