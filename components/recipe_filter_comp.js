import EditIcon from '@mui/icons-material/Edit';
import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Grid, IconButton } from '@mui/material';
import React, { Component } from 'react';
import RecipeFilterModal from './recipe_filter_modal_comp';

class RecipeFilter extends Component {
    state = {
        restrictionModalOpen: false,
        ingredientModalOpen: false,
        equipmentModalOpen: false,
        recipeModalOpen: false
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
                <Card sx={{width: "200px", height:"260px"}}>
                    <CardHeader title='Filters' />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={10}>
                                <FormControlLabel
                                    control={<Checkbox onClick={() => { this.props.onToggleFilter("useRestrictionFilter") }} />}
                                    label="Restrictions"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={() => { this.onToggleModal("restrictionModalOpen")} }
                                >
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={10}>
                                <FormControlLabel
                                    control={<Checkbox onClick={() => { this.props.onToggleFilter("useEquipmentFilter") }} />}
                                    label="Equipment"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={() => { this.onToggleModal("equipmentModalOpen")} }
                                >
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={10}>
                                <FormControlLabel
                                    control={<Checkbox onClick={() => { this.props.onToggleFilter("useIngredientFilter") }} />}
                                    label="Ingredient"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={() => { this.onToggleModal("ingredientModalOpen")} }
                                >
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={10}>
                                <FormControlLabel
                                    control={<Checkbox onClick={() => { this.props.onToggleFilter("useRecipesFilter") }} />}
                                    label="Recipes"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={() => { this.onToggleModal("recipeModalOpen")} }
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
                /> {/* TODO switch to recipe modal and state */}
                <RecipeFilterModal
                    isOpen={this.state.recipeModalOpen}
                    onToggleModal={() => { this.onToggleModal("recipeModalOpen") }}
                    title="My Recipes"
                    options={this.props.equipment}
                    myOptions={this.props.myEquipment}
                />
            </>
        );
    }
}
 
export default RecipeFilter;