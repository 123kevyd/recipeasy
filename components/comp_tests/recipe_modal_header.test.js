import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react';
import RecipeModalHeader from '../recipe_modal_header'
import '@testing-library/jest-dom/extend-expect';

// required to prevent jest from flooding the terminal with the intended error messages
function expectToThrow(testFunction) {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => { /* Intentionally left blank */ });

    expect(testFunction).toThrow()

    spy.mockRestore();
}

test("Passing empty title", () => {
    const handleClick = jest.fn()

    render(<RecipeModalHeader title="" onToggleModal={handleClick} />);

    const closeButton = screen.queryByTestId("CloseIcon").parentElement;
    const title = closeButton.parentElement.firstChild;
    
    expect(closeButton).not.toBeNull()
    expect(title).not.toBeNull()
    
    expect(title.textContent).toBe("");

    fireEvent.click(closeButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
})

test("Passing title and onToggleModal", () => {
    const handleClick = jest.fn()
    
    render(<RecipeModalHeader title="Header" onToggleModal={handleClick} />);

    const closeButton = screen.queryByTestId("CloseIcon").parentElement;
    const title = screen.queryByText("Header")
    
    expect(closeButton).not.toBeNull()
    expect(title).not.toBeNull()
    
    expect(title.textContent).toBe("Header");

    fireEvent.click(closeButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
})

test("Passing no props", () => {
    expectToThrow(() => {render(<RecipeModalHeader />);});
})

test("Passing only valid title", () => {
    expectToThrow(() => {render(<RecipeModalHeader title="Heading" />);});
})

test("Passing only valid onToggleModal", () => {
    expectToThrow(() => {render(<RecipeModalHeader onToggleModal={() => { return true }} />);});
})

test("Passing title and null onToggleModal", () => {
    expectToThrow(() => {render(<RecipeModalHeader title="Heading" onToggleModal={null} />);});
})

test("Passing title and non-function onToggleModal", () => {
    expectToThrow(() => {render(<RecipeModalHeader title="Heading" onToggleModal={0} />);});
})

test("Passing null title and onToggleModal", () => {
    expectToThrow(() => {render(<RecipeModalHeader title={null} onToggleModal={() => { return true }} />);});
})

test("Passing non-string title and onToggleModal", () => {
    expectToThrow(() => {render(<RecipeModalHeader title={0} onToggleModal={() => { return true }} />);});
})
