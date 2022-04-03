import { Button, Card, CardContent, CardHeader, Dialog } from '@mui/material';
import React, { Component } from 'react';
import KitchenCategory from './kitchen_category_comp';
import RecipeModalHeader from './recipe_modal_header';

class RecipeFilterModal extends Component {
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
                <KitchenCategory
                    items={this.props.options}
                    myItems={this.props.myOptions}
                />
                <Button sx={{margin:2}} variant='contained' fullWidth={false}>Save</Button>
            </Dialog>
        );
    }
}
 
export default RecipeFilterModal;