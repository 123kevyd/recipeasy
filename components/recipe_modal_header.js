import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

class RecipeModalHeader extends Component {
    render() { 
        return (
            <AppBar 
                position='sticky'
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