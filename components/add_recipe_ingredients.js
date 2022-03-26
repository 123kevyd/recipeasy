import { useState } from "react";
import { Box } from '@mui/material'

function AddRecipeIngredients() {
    const [IngredientList, setIngredientList] = useState([{ ingredient: "", quantity: 0, unit: "" }]);

    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...IngredientList];
        list[index][name] = value;
        setIngredientList(list);
    };

    const handleIngredientRemove = (index) => {
        const list = [...IngredientList];
        list.splice(index, 1);
        setIngredientList(list);
    };

    const handleIngredientAdd = () => {
        setIngredientList([...IngredientList, { ingredient: "", quantity: 0, unit: "" }]);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setIngredientList(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
    }

    return (
        <Box className="form-field">
            {IngredientList.map((singleIngredient, index) => (
                <Box key={index} className="Ingredients">
                    <Box className="first-division">
                        <form onSubmit={handleSubmit}>
                            <label>Ingredient:
                                <input 
                                    type="text" 
                                    onChange={handleChange}
                                />
                            </label>
                            <label>Quantity:
                                <input 
                                    type="number" 
                                />
                            </label>
                            <label>Unit:
                                <input 
                                    type="text" 
                                />
                            </label>
                            <input type="submit" />
                        </form>
                        {IngredientList.length - 1 === index && (
                            <button
                                type="button"
                                onClick={handleIngredientAdd}
                                className="add-btn"
                            >
                                <span>Add Ingredient</span>
                            </button>
                        )}
                    </Box>
                    <Box className="second-division">
                    {IngredientList.length !== 1 && (
                        <button
                            type="button"
                            onClick={() => handleIngredientRemove(index)}
                            className="remove-btn"
                        >
                            <span>Remove</span>
                        </button>
                            )}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default AddRecipeIngredients;