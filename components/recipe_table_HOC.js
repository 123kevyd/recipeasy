import React from 'react';
import { userStore } from "/store/user_store"
import RecipeTable from './recipe_table';

export default function RecipeTableHOC(props) {
    const myRestrictions = userStore(state => state.restrictions)
    const myEquipment = userStore(state => state.equipment)
    const myIngredients = userStore(state => state.ingredients)
    const myRecipes = (userStore(state => state.recipes))
    return (
        <RecipeTable
            myRestrictions={myRestrictions}
            myEquipment={myEquipment}
            myIngredients={myIngredients}
            myRecipes={myRecipes}
            {...props}
        />
    )
}