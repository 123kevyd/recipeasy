import {Card, CardContent, CardHeader, TextField} from '@mui/material';
import React, {Component} from 'react';

/**
 * Used to display a recipe for viewing
 * @prop {function} handleChange - changes state if a change occurs in text field
 */


class AddRecipeDescription extends Component {

    constructor(props) {
        super(props)

        if (!this.props || !this.props.handleChange) {
            throw new Error("Required function prop not found");
        }
    }

    render() {
        return (
            <Card>
                <CardHeader title="Description"/>
                <CardContent>
                    <TextField
                        data-testid="desc"
                        required
                        label="Description"
                        fullWidth
                        multiline
                        rows={5}
                        onChange={(event) => this.props.handleChange(event.target.value)}
                    />
                </CardContent>
            </Card>
        );
    }
}

export default AddRecipeDescription;
