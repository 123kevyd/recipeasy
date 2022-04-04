import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AddRecipeEquipment from '../add_recipe_equipment_comp';


/*
test("Checking Element Exists", () => {
    const handle = jest.fn()
    render(<AddRecipeInstructions handleContent={handle} />);
    const getArray = screen.queryAllByText("Description").filter((element) => { return element.tagName == "LABEL" })
    const textField = getArray[0].parentElement.lastChild.firstChild
    expect(textField).toBeEmptyDOMElement()
})
*/
test("Checking Method Is called On Change", () => {
    const state = {
        newRecipe: {
            "equipment": [
                ""
            ]
        }
    }
    const equipment = [{
        id: 1,
        title: "whisk"
    }]
    const handle = jest.fn()
    
    render(<AddRecipeEquipment handleContent={handle} state={state} equipment={equipment}/>)
    const toClick = screen.getAllByRole('button')
    fireEvent.mouseDown(toClick[0])
    const option = screen.getByRole('option')
    fireEvent.click(option)
    
    expect(handle).toBeCalledTimes(1)
    expect(toClick[0].textContent).toEqual('whisk')
})