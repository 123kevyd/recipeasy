import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react';
import AddRecipeDescription from '../add_recipe_description'
import '@testing-library/jest-dom/extend-expect';

// required to prevent jest from flooding the terminal with the intended error messages
function expectToThrow(testFunction) {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => { /* Intentionally left blank */ });

    expect(testFunction).toThrow()

    spy.mockRestore();
}

test("Passing no props", () => {
    expectToThrow(() => {render(<AddRecipeDescription />);});
})

test("Checking Element Exists", () => {
    const handle = jest.fn()
    render(<AddRecipeDescription handleChange={handle}/>);
    const getArray = screen.queryAllByText("Description").filter((element) => { return element.tagName == "LABEL" })
    const textField = getArray[0].parentElement.lastChild.firstChild
    expect(textField).toBeEmptyDOMElement()
})

test("Checking Method Is called On Change", () => {
    const handle = jest.fn();
    render(<AddRecipeDescription handleChange={handle}/>);
    const getArray = screen.queryAllByText("Description").filter((element) => { return element.tagName == "LABEL" })
    const textField = getArray[0].parentElement.lastChild.firstChild
    fireEvent.change(textField, {target: {value: '23'}})
    expect(textField).toHaveValue("23")
    expect(handle).toBeCalledTimes(1)
})