import {Button, Dialog} from "@mui/material";
import React, {Component} from "react";
import KitchenCategory from "./kitchen_category";
import RecipeModalHeader from "./recipe_modal_header";

class RecipeFilterModal extends Component {
    state = {  }
    render() {
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.onToggleModal}
            >
                <div id={this.props.field + "Modal"}>
                    <RecipeModalHeader
                        title={this.props.title}
                        onToggleModal={this.props.onToggleModal}
                    />
                    <KitchenCategory
                        items={this.props.options}
                        title={this.props.title}
                        field={this.props.field}
                    />
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

export default RecipeFilterModal;
