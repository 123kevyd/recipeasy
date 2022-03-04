import { Chip, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { Component } from 'react';

class RecipeTable extends Component {
    getAverageDifficulty(reviews) {
        let sum = 0
        Object.values(reviews).forEach( review => {
            sum += review.difficulty;
        })
        return (sum / reviews.length).toFixed(1)
    }
    getAverageRating(reviews) {
        let sum = 0
        Object.values(reviews).forEach( review => {
            sum += review.rating;
        })
        return (sum / reviews.length).toFixed(1)
    }

    getTags(tags) {
        return tags.map( tag => <Chip key={tag} label={tag} />)
    }

    render() { 
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>Name</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Difficulty</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Tags</TableCell>
                    </TableHead>
                    { this.props.recipes.map( recipe =>
                        <TableRow key={recipe}>
                            <TableCell>{recipe.title}</TableCell>   
                            <TableCell>{recipe.time}</TableCell>
                            <TableCell>{this.getAverageDifficulty(recipe.reviews)}</TableCell>
                            <TableCell>{this.getAverageRating(recipe.reviews)}</TableCell>
                            <TableCell>{this.getTags(recipe.tags)}</TableCell>
                        </TableRow>
                    )}
                </Table>
            </TableContainer>
        );
    }
}
 
export default RecipeTable;