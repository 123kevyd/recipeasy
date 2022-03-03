import React, { Component } from 'react';
import { Dialog, Button } from '@mui/material';

class View_Recipe extends Component {
    state = { 
        open: false,
     };

    render() { 
        return (
            <>
                <p>test</p>
                <Dialog fullScreen open={this.props.recipeOpen} onClose={() => this.props.onToggleRecipeView()}>
                    <Button variant="contained" onClick={this.props.onToggleRecipeView}>TEST</Button>
                </Dialog>
            </>
        );
    }
}
 
export default View_Recipe;