import React, {Component} from "react";
import {Dialog} from "@mui/material";
import RecipeModalHeader from "./recipe_modal_header";
import RecipeDisplay from "./recipe_display";
import RecipeRatingDisplay from "./recipe_rating_display";
import RecipeRatingSubmit from "./recipe_rating_submit";

/**
 * Used to display a recipe for viewing
 * @prop {boolean} recipeOpen - if this modal is currently open
 * @prop {function} onToggleRecipeView - toggles the value of recipeOpen
 * @prop {object} recipe - a recipe object with a:
 *  - string: title
 *  - string: description
 *  - string array: tags
 *  - ingrediant array: ingrediants
 *  - string array: equipment
 *  - string array: instruction
 *  - object array: reviews
 *      - number: review
 *      - number: difficulty
 *      - string: description
 */

class ViewRecipe extends Component {
    constructor(props) {
        super(props)

        this.validateRecipeValues()
        this.validateRecipeLists()
        this.validateRecipeReviews()
    }

    validateRecipeValues() {
        if (!this.props || !this.props.recipe) {
            throw new Error("Required recipe prop not found");
        } else if (typeof this.props.recipe !== "object") {
            throw new Error(`Prop recipe must be an object - Is ${this.props.recipe} (${typeof this.props.recipe}) `);
        } else if (!this.props.recipe.title || typeof this.props.recipe.title !== "string") {
            throw new Error(`Prop recipe.title must be a string - Is ${this.props.recipe.title} (${typeof this.props.recipe.title}) `);
        } else if (!this.props.recipe.description || typeof this.props.recipe.description !== "string") {
            throw new Error(`Prop recipe.description must be a string - Is ${this.props.recipe.description} (${typeof this.props.recipe.description}) `);
        } else if (!this.props.recipe.time || typeof this.props.recipe.time !== "number") {
            throw new Error(`Prop recipe.description must be a string - Is ${this.props.recipe.time} (${typeof this.props.recipe.time}) `);
        }
    }

    validateRecipeLists() {
        if (!this.props.recipe.tags || typeof this.props.recipe.tags !== "object" || !Array.isArray(this.props.recipe.tags)) {
            throw new Error(`Prop recipe.tags must be an array - Is ${this.props.recipe.tags} (${typeof this.props.recipe.tags}) `);
        } else if (!this.props.recipe.ingredients || typeof this.props.recipe.ingredients !== "object" || !Array.isArray(this.props.recipe.ingredients)) {
            throw new Error(`Prop recipe.ingredients must be an array - Is ${this.props.recipe.ingredients} (${typeof this.props.recipe.ingredients}) `);
        } else if (!this.props.recipe.equipment || typeof this.props.recipe.equipment !== "object" || !Array.isArray(this.props.recipe.equipment)) {
            throw new Error(`Prop recipe.equipment must be an array - Is ${this.props.recipe.equipment} (${typeof this.props.recipe.equipment}) `);
        } else if (!this.props.recipe.directions || typeof this.props.recipe.directions !== "object" || !Array.isArray(this.props.recipe.directions)) {
            throw new Error(`Prop recipe.equipment must be an array - Is ${this.props.recipe.directions} (${typeof this.props.recipe.directions}) `);
        }
    }

    validateRecipeReviews() {
        if (!this.props.recipe.reviews) {
            throw new Error("Required reviews prop not found");
        } else if (typeof this.props.recipe.reviews !== "object" || !Array.isArray(this.props.recipe.reviews)) {
            throw new Error(`Prop recipe.reviews must be an array - Is ${this.props.recipe.reviews} (${typeof this.props.recipe.reviews}) `);
        } else if (!this.props.recipe.reviews.every((elem) => {return typeof elem.stars === "number"})) {
            throw new Error(`Prop recipe.rating[i].stars (${JSON.stringify(this.props.recipe.reviews[0])}, ${this.props.recipe.reviews[0].stars}, ${this.props.recipe.reviews[1].stars}, ${this.props.recipe.reviews[2].stars}) must be a number `);
        } else if (!this.props.recipe.reviews.every((elem) => {return typeof elem.difficulty === "number"})) {
            throw new Error("Prop recipe.reviews[i].difficulty must be a number ");
        } else if (!this.props.recipe.reviews.every((elem) => {return typeof elem.review === "string"})) {
            throw new Error("Prop recipe.reviews[i].review must be a string ");
        } else if (typeof this.props.onToggleRecipeView !== "function") {
            throw new Error(`Prop onToggleRecipeView must be a function - Is ${this.props.onToggleRecipeView} (${typeof this.props.onToggleRecipeView}) `)
        } else if (this.props.recipeOpen === undefined || this.props.recipeOpen === null || typeof this.props.recipeOpen !== "boolean") {
            throw new Error(`Prop recipeOpen must be a boolean - Is ${this.props.recipeOpen} (${typeof this.props.recipeOpen}) `)
        }
    }

    render() {
        return (
            <Dialog
                maxWidth="lg"
                fullWidth
                open={this.props.recipeOpen}
                onClose={this.props.onToggleRecipeView}
            >
                <>
                    <div id="viewRecipeModalHeader">
                        <RecipeModalHeader
                            onToggleModal={this.props.onToggleRecipeView}
                            title="Recipe Viewer"
                        />
                    </div>
                    <RecipeDisplay recipe={this.props.recipe} />
                    <RecipeRatingSubmit recipe={this.props.recipe} addReview={this.props.addReview}/>
                    <RecipeRatingDisplay reviews={(this.props.recipe !== undefined ? this.props.recipe.reviews : undefined)} />
                </>
            </Dialog>
        );
    }
}

export default ViewRecipe;
