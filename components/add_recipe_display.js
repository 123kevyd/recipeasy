import React, {Component} from "react";
import {Box, Button, TextField, Card, CardHeader, CardContent, createTheme} from "@mui/material"
import AddRecipeDescription from "./add_recipe_description";
import AddRecipeRestriction from "./add_recipe_restrictions";
import AddRecipeTime from "./add_recipe_time";
import AddRecipeIngredient from "./add_recipe_ingredient";
import AddRecipeInstructions from "./add_recipe_instructions";
import AddRecipeEquipment from "./add_recipe_equipment";

class AddRecipeDisplay extends Component {
	theme = createTheme({
		overrides: {
			Card: {
                root: {
                    margin: "15px"
                }
			}
		}
	})

    unit = [
        "teaspoon",
        "tablespoon",
        "cup"
    ];

    state = {
        newRecipe: {
            "title": "",
            "directions": [
                ""
            ],
            "ingredients": [{
                unit: "",
                quantity: 0,
                name: ""
            }],
            "equipment": [
                ""
            ],
            "description": "",
            "tags": [],
            "time": 0
        }
    }

    getTagIds(tags) {
        let toReturn = [];

        for (let tag of tags) {
            for (let restriction of this.props.restrictions) {
                if (restriction.title == tag) {
                    toReturn.push(restriction.id)
                    break
                }
            }
        }

        return toReturn;
    }

    getEquipmentIds(equipment) {
        let toReturn = [];

        for (let paramEquipment of equipment) {
            for (let propEquipment of this.props.equipment) {
                if (propEquipment.title == paramEquipment) {
                    toReturn.push(propEquipment.id);
                    break
                }
            }
        }

        return toReturn;
    }

    getIngredientIds(ingredients) {
        let toReturn = [];

        for (let paramIngredient of ingredients) {
            for (let propIngredient of this.props.ingredients) {
                if (propIngredient.title == paramIngredient.name) {
                    toReturn.push({
                        id: propIngredient.id,
                        quantity: paramIngredient.quantity,
                        unit: paramIngredient.name
                    });
                    break
                }
            }
        }

        return toReturn;
    }

    handleUpdateTitle(title) {
        let setTitle = JSON.parse(JSON.stringify(this.state.newRecipe));
        setTitle.title = title;
        this.setState({newRecipe: setTitle});
    }

    handleUpdateTime(newTime) {
        let setTime = JSON.parse(JSON.stringify(this.state.newRecipe));
        setTime.time = newTime;
        this.setState({newRecipe: setTime});
    }

    handleAddEquipment() {
        let addEquip = JSON.parse(JSON.stringify(this.state.newRecipe));
        addEquip.equipment.push("");
        this.setState({newRecipe: addEquip});
    }

    handleDeleteEquipment(index) {
        let delEquip = JSON.parse(JSON.stringify(this.state.newRecipe));
        if (index > -1) {
            delEquip.equipment.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({newRecipe: delEquip});
    }

    handleUpdateEquipment(content, index) {
        let updatedEquip = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedEquip.equipment[index] = content;
        this.setState({newRecipe: updatedEquip});
    }

    handleUpdateInstruction(content, index) {
        let updatedInst = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedInst.directions[index] = content;
        this.setState({newRecipe: updatedInst});
    }

    handleAddInstruction() {
        let addInst = JSON.parse(JSON.stringify(this.state.newRecipe));
        addInst.directions.push(
            ""
        );
        this.setState({newRecipe: addInst});
    }

    handleDeleteInstruction(index) {
        let delInst = {...this.state.newRecipe};
        if (index > -1) {
            delInst.directions.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({newRecipe: delInst});
    }

    handleAddIngredient() {
        let addIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        addIngredient.ingredients.push({
            unit: "",
            quantity: 0,
            name: ""
        });
        this.setState({newRecipe: addIngredient});
    }

    handleDeleteIngredient(index) {
        let delIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        if (index > -1) {
            delIngredient.ingredients.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({newRecipe: delIngredient});
    }

    handleUpdateIngredientName(ingredient, index) {
        let updatedIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedIngredient.ingredients[index].name = ingredient;
        this.setState({newRecipe: updatedIngredient});
    }

    handleUpdateIngredientUnit(unit, index) {
        let updatedIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedIngredient.ingredients[index].unit = unit;
        this.setState({newRecipe: updatedIngredient});
    }

    handleUpdateIngredientQuantity(quantity, index) {
        let updatedIngredient = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedIngredient.ingredients[index].quantity = quantity;
        this.setState({newRecipe: updatedIngredient});
    }

    handleUpdateDescription(description) {
        let updatedRecipe = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedRecipe.description = description;
        this.setState({newRecipe: updatedRecipe});
    }

    handleUpdateRestrictions(tags) {
        let updatedTags = JSON.parse(JSON.stringify(this.state.newRecipe));
        updatedTags.tags = typeof tags === "string" ? tags.split(",") : tags;
        this.setState({newRecipe: updatedTags});
    }

    formatAddRequest() {
        let recipe =  this.state.newRecipe;
        return {
            "data": {
                "name": recipe.title,
                "instructions": recipe.directions,
                "ingredients": this.getIngredientIds(this.state.newRecipe.ingredients),
                "equipment": this.getEquipmentIds(this.state.newRecipe.equipment),
                "details": recipe.description,
                "tags": recipe.tags,
                "time": recipe.time
            }
        }
    }

    checkIngredients() {
        let toCheck = this.state.newRecipe.ingredients;
        let toReturn = true;
        toCheck.forEach(ing => {
            if (ing.quantity < 1) {
                toReturn = false
            }
        });
        return toReturn;
    }

    checkInstructions() {
        let toCheck = this.state.newRecipe.ingredients;
        let toReturn = true;
        toCheck.forEach(instruction => {
            if (instruction == "") {
                toReturn = false;
            }
        });
        return toReturn;
    }

    async addRecipe() {
        let formattedBody = this.formatAddRequest();
        if (formattedBody.data.name != "" &&
            formattedBody.data.time > 0 &&
            formattedBody.data.ingredients.length > 0 &&
            formattedBody.data.instructions.length > 0 &&
            this.checkInstructions() &&
            this.checkIngredients()) {
            const response = await fetch("/api/recipes", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "User-Agent": "*"
                },
                body: JSON.stringify(formattedBody)
            });
            this.props.onToggleModal();
        } else {
            alert("Missing Fields");
        }
    }

    render() {
        return (
            <Box
            classes="wide-text"
            >
                <Card>
                    <CardHeader title="Recipe Name"/>
                    <CardContent>
                        <TextField
                            label="Title"
                            fullWidth
                            onChange={(event) => this.handleUpdateTitle(event.target.value)}
                        />
                    </CardContent>
                </Card>
                <Box sx={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                    <Box>
                        <AddRecipeDescription
                            handleChange={this.handleUpdateDescription.bind(this)}
                        />
                        <AddRecipeInstructions
                            handleAdd={this.handleAddInstruction.bind(this)}
                            handleDelete={this.handleDeleteInstruction.bind(this)}
                            handleContent={this.handleUpdateInstruction.bind(this)}
                            directions={this.state.newRecipe.directions}
                        />
                        <AddRecipeEquipment
                            handleAdd={this.handleAddEquipment.bind(this)}
                            handleDelete={this.handleDeleteEquipment.bind(this)}
                            handleContent={this.handleUpdateEquipment.bind(this)}
                            equipment={this.props.equipment}
                            currEquipment={this.state.newRecipe.equipment}
                        />
                    </Box>
                    <Box>
                        <AddRecipeTime
                            handleChange={this.handleUpdateTime.bind(this)}
                        />
                        <AddRecipeRestriction
                            handleChange={this.handleUpdateRestrictions.bind(this)}
                            state={this.state}
                            restrictions={this.props.restrictions}
                        />
                        <AddRecipeIngredient
                            handleAdd={this.handleAddIngredient.bind(this)}
                            handleDelete={this.handleDeleteIngredient.bind(this)}
                            handleName={this.handleUpdateIngredientName.bind(this)}
                            handleUnit={this.handleUpdateIngredientUnit.bind(this)}
                            handleQuantity={this.handleUpdateIngredientQuantity.bind(this)}
                            ingredients={this.props.ingredients}
                            currIngredient={this.state.newRecipe.ingredients}
                            unit={this.unit}
                        />
                        <Card>
                            <CardHeader/>
                            <CardContent>
                                <Box textAlign="center">
                                    <Button variant="contained" onClick={() => this.addRecipe()}>Submit</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default AddRecipeDisplay;
