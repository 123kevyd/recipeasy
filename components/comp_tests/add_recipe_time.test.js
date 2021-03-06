import {render, screen, fireEvent} from "@testing-library/react"
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import AddRecipeTime from "../add_recipe_time";


test("Checking Element Exists", () => {
    const handle = jest.fn()
    render(<AddRecipeTime handleChange={handle}/>);
    const getArray = screen.queryAllByText("Total Minutes").filter((element) => {return element.tagName == "LABEL"})
    const textField = getArray[0].parentElement.lastChild.firstChild
    expect(textField).toBeEmptyDOMElement()
})

test("Check Inputting Number", () => {
    const handle = jest.fn();
    render(<AddRecipeTime handleChange={handle}/>);
    const getArray = screen.queryAllByText("Total Minutes").filter((element) => {return element.tagName == "LABEL"})
    const textField = getArray[0].parentElement.lastChild.firstChild
    fireEvent.change(textField, {target: {value: "23"}})
    expect(textField).toHaveValue(23)
    expect(handle).toBeCalledTimes(1)
})

test("Check Inputting String", () => {
    const handle = jest.fn();
    render(<AddRecipeTime handleChange={handle}/>);
    const getArray = screen.queryAllByText("Total Minutes").filter((element) => {return element.tagName == "LABEL"})
    const textField = getArray[0].parentElement.lastChild.firstChild
    fireEvent.change(textField, {target: {value: "yo"}})
    expect(textField).toHaveValue(null)
    expect(handle).toBeCalledTimes(0)
})
