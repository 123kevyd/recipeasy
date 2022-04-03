import EditIcon from '@mui/icons-material/Edit';
import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Grid, IconButton } from '@mui/material';
import React, { Component } from 'react';
import RecipeFilterModal from './recipe_filter_modal_comp';

class RecipeFilter extends Component {
    state = {
        restrictionModalOpen: false,
        ingredientModalOpen: false,
        equipmentModalOpen: false
    }

    onToggleModal(modalStr) {
        const newVal = !this.state[modalStr]
        let newState = {}
        newState[modalStr] = newVal;
        this.setState(newState)
    }


    render() { 
        return (
            <>
                <Card sx={{width: "200px", height:"215px"}}>
                    <CardHeader title='Filters' />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={10}>
                                <FormControlLabel control={<Checkbox />} label="Restrictions" />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={() => { this.onToggleModal("restrictionModalOpen")} }
                                >
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={10}>
                                <FormControlLabel control={<Checkbox />} label="Equipment" />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={() => { this.onToggleModal("equipmentModalOpen")} }
                                >
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={10}>
                                <FormControlLabel control={<Checkbox />} label="Ingredient" />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={() => { this.onToggleModal("ingredientModalOpen")} }
                                >
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent> 
                </Card>
                <RecipeFilterModal
                    isOpen={this.state.restrictionModalOpen}
                    onToggleModal={() => { this.onToggleModal("restrictionModalOpen") }}
                    title="My Restrictions"
                    options={this.props.restrictions}
                    myOptions={this.props.myRestrictions}
                />
                <RecipeFilterModal
                    isOpen={this.state.ingredientModalOpen}
                    onToggleModal={() => { this.onToggleModal("ingredientModalOpen") }}
                    title="My Ingredients"
                    options={this.props.ingredients}
                    myOptions={this.props.myIngredients}
                />
                <RecipeFilterModal
                    isOpen={this.state.equipmentModalOpen}
                    onToggleModal={() => { this.onToggleModal("equipmentModalOpen") }}
                    title="My Equipment"
                    options={this.props.equipment}
                    myOptions={this.props.myEquipment}
                />
            </>
        );
    }
}
 
export default RecipeFilter;