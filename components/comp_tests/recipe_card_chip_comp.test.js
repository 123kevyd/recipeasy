import { render, screen } from '@testing-library/react'
import React from 'react';
import RecipeCardChip from '../recipe_card_chip_comp'
import '@testing-library/jest-dom/extend-expect';

// required to prevent jest from flooding the terminal with the intended error messages
function expectToThrow(testFunction) {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    expect(testFunction).toThrow()

    spy.mockRestore();
}

test("Passing empty title", () => {
    render(<RecipeCardChip title="" list={["Chip"]} />);
    const cardBody = screen.queryByText("Chip")
    const cardTitle = cardBody.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.firstChild
    
    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()
    
    expect(cardTitle.textContent).toBe("");
    expect(cardBody.textContent).toBe("Chip");
})

test("Passing empty list", () => {
    render(<RecipeCardChip title="Header" list={[]} />);
    const cardTitle = screen.queryByText("Header")
    const cardBody = cardTitle.parentElement.parentElement.parentElement.lastChild.firstChild
    
    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()
    
    expect(cardTitle.textContent).toBe("Header");
    expect(cardBody.hasChildNodes()).toBe(false);
})

test("Passing size 1 list", () => {
    render(<RecipeCardChip title="Header" list={["Chip1"]} />);
    const cardTitle = screen.queryByText("Header")
    const cardBody = screen.queryByText("Chip1").parentElement.parentElement
    
    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()
    
    expect(cardTitle.textContent).toBe("Header");
    expect(cardBody.hasChildNodes()).toBe(true);
    expect(cardBody.childElementCount).toBe(1);
})

test("Passing size 5 list", () => {
    render(<RecipeCardChip title="Header" list={["Chip1", "Chip2", "Chip3", "Chip4", "Chip5"]} />);
    const cardTitle = screen.queryByText("Header")
    const cardBody = screen.queryByText("Chip1").parentElement.parentElement
    
    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()
    
    expect(cardTitle.textContent).toBe("Header");
    expect(cardBody.hasChildNodes()).toBe(true);
    expect(cardBody.childElementCount).toBe(5);
})

test("Passing no props", () => {
    expectToThrow(() => {render(<RecipeCardChip />);});
})

test("Passing only valid title", () => {
    expectToThrow(() => {render(<RecipeCardChip title="Heading" />);});
})

test("Passing only valid list", () => {
    expectToThrow(() => {render(<RecipeCardChip list={["Chip"]} />);});
})

test("Passing title and null list", () => {
    expectToThrow(() => {render(<RecipeCardChip title="Heading" list={null} />);});
})

test("Passing title and non-array list", () => {
    expectToThrow(() => {render(<RecipeCardChip title="Heading" list={0} />);});
})

test("Passing title and non-string-array list", () => {
    expectToThrow(() => {render(<RecipeCardChip title="Heading" list={[1]} />);});
})

test("Passing null title and list", () => {
    expectToThrow(() => {render(<RecipeCardChip title={null} list={["Chip"]} />);});
})

test("Passing non-string title and text", () => {
    expectToThrow(() => {render(<RecipeCardChip title={0} list={["Chip"]} />);});
})
