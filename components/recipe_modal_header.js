import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Used for ratings. Shows 5 stars with the specified number of stars filled
 * @prop {string} title - the title of the heading
 * @prop {function} onToggleModal - a function to be called when the modal is closed
 */

class RecipeModalHeader extends Component {
    constructor(props) {
        super(props)

        if (!this.props || !this.props.title && this.props.title !== "") {
            throw new Error("Required title prop not found");
        } else if (typeof this.props.title !== "string") {
            throw new Error(`Prop title must be a string - Is ${this.props.title} (${typeof this.props.title}) `);
        } else if (!this.props.onToggleModal) {
            throw new Error("Required onToggleModal prop not found");
        }  else if (typeof this.props.list === "function") {
            throw new Error(`Prop onToggleModal must be a function - Is ${this.props.onToggleModal} (${typeof this.props.onToggleModal}) `);
        }
    }
    render() {
        return (
            <AppBar
                position="sticky"
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>{this.props.title}</Typography>
                    <IconButton edge="end" onClick={this.props.onToggleModal}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default RecipeModalHeader;
