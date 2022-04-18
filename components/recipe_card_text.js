import React, {Component} from 'react';
import {Card, CardHeader, CardContent, Typography} from '@mui/material';

/**
 * Used for ratings. Shows 5 stars with the specified number of stars filled
 * @prop {string} title - the title of the card
 * @prop {string} text - the body text of the card
 */

class RecipeCardText extends Component {
    constructor(props) {
        super(props)

        if (!this.props || !this.props.title && this.props.title !== "") {
            throw new Error("Required title prop not found");
        } else if (!this.props.text && this.props.text !== "") {
            throw new Error("Required text prop not found");
        } else if (typeof this.props.title !== "string") {
            throw new Error(`Prop title must be a string - Is ${this.props.title} (${typeof this.props.title}) `);
        } else if (typeof this.props.text !== "string") {
            throw new Error(`Prop text must be a string - Is ${this.props.text} (${typeof this.props.text}) `);
        }
    }

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
