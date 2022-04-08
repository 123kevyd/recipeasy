import { render, screen } from '@testing-library/react'
import React from 'react';
import RecipeCardList from '../recipe_card_list_comp'
import '@testing-library/jest-dom/extend-expect';

// required to prevent jest from flooding the terminal with the intended error messages
function expectToThrow(testFunction) {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    expect(testFunction).toThrow()

    spy.mockRestore();
}

test("Passing empty title", () => {
    render(<RecipeCardList title="" list={["Item"]} />);
    const cardBody = screen.queryByText("Item")
    const cardTitle = cardBody.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.firstChild
    
    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()
    
    expect(cardTitle.textContent).toBe("");
    expect(cardBody.textContent).toBe("Item");
})

test("Passing empty list", () => {
    render(<RecipeCardList title="Header" list={[]} />);
    const cardTitle = screen.queryByText("Header")
    const cardBody = cardTitle.parentElement.parentElement.parentElement.lastChild.firstChild
    
    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()
    
    expect(cardTitle.textContent).toBe("Header");
    expect(cardBody.hasChildNodes()).toBe(false);
})

test("Passing size 1 list", () => {
    render(<RecipeCardList title="Header" list={["Item1"]} />);
    const cardTitle = screen.queryByText("Header")
    const listElem = screen.queryByText("Item1")
    const cardBody = listElem.parentElement.parentElement.parentElement
    
    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()
    
    expect(cardTitle.textContent).toBe("Header");
    expect(cardBody.hasChildNodes()).toBe(true);
    expect(cardBody.childElementCount).toBe(1);
})

test("Passing size 5 list", () => {
    render(<RecipeCardList title="Header" list={["Item1", "Item2", "Item3", "Item4", "Item5"]} />);
    const cardTitle = screen.queryByText("Header")
    const firstListElem = screen.queryByText("Item1")
    const midListElem = screen.queryByText("Item3")
    const lastListElem = screen.queryByText("Item5")
    const cardBody = firstListElem.parentElement.parentElement.parentElement
    
    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()

    expect(firstListElem).not.toBeNull()
    expect(midListElem).not.toBeNull()
    expect(lastListElem).not.toBeNull()
    
    expect(cardTitle.textContent).toBe("Header");
    expect(cardBody.hasChildNodes()).toBe(true);
    expect(cardBody.childElementCount).toBe(5);
})

test("Passing no props", () => {
    expectToThrow(() => {render(<RecipeCardList />);});
})

test("Passing only valid title", () => {
    expectToThrow(() => {render(<RecipeCardList title="Heading" />);});
})

test("Passing only valid list", () => {
    expectToThrow(() => {render(<RecipeCardList list={["Chip"]} />);});
})

test("Passing title and null list", () => {
    expectToThrow(() => {render(<RecipeCardList title="Heading" list={null} />);});
})

test("Passing title and non-array list", () => {
    expectToThrow(() => {render(<RecipeCardList title="Heading" list={0} />);});
})

test("Passing title and non-string-array list", () => {
    expectToThrow(() => {render(<RecipeCardList title="Heading" list={[1]} />);});
})

test("Passing null title and list", () => {
    expectToThrow(() => {render(<RecipeCardList title={null} list={["Chip"]} />);});
})

test("Passing non-string title and text", () => {
    expectToThrow(() => {render(<RecipeCardList title={0} list={["Chip"]} />);});
})
