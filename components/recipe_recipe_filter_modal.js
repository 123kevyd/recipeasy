import { Button, Dialog } from '@mui/material';
import React, { Component } from 'react';
import MyRecipes from './recipes';
import RecipeModalHeader from './recipe_modal_header';

class RecipeRecipeFilterModal extends Component {
    state = {  }
    render() {
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.onToggleModal}
            >
                <div id="recipesModal">
                    <RecipeModalHeader
                        title={this.props.title}
                        onToggleModal={this.props.onToggleModal}
                    />
                    <MyRecipes />
                    <Button
                        sx={{margin: 2}}
                        variant="contained"
                        fullWidth={false}
                        onClick={() => {this.props.onToggleModal()}}
                    >Ok</Button>
                </div>
            </Dialog>
        );
    }
}

export default RecipeRecipeFilterModal;
