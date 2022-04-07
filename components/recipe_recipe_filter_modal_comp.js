import { Button, Dialog } from '@mui/material';
import React, { Component } from 'react';
import MyRecipes from './my_recipes_comp';
import RecipeModalHeader from './recipe_modal_header';

class RecipeRecipeFilterModal extends Component {
    state = {  } 
    render() {
        return ( 
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.onToggleModal}
            >
                <RecipeModalHeader
                    title={this.props.title}
                    onToggleModal={this.props.onToggleModal}
                />
                <MyRecipes />
                <Button
                    sx={{margin:2}}
                    variant='contained'
                    fullWidth={false}
                    onClick={() => {this.props.onToggleModal()}}
                >Ok</Button>
            </Dialog>
        );
    }
}
 
export default RecipeRecipeFilterModal;