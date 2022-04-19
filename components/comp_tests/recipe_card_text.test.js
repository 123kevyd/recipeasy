import {render, screen} from "@testing-library/react"
import React from "react";
import RecipeCardText from "../recipe_card_text"
import "@testing-library/jest-dom/extend-expect";

// required to prevent jest from flooding the terminal with the intended error messages
function expectToThrow(testFunction) {
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation(() => {/* Intentionally left blank */});

    expect(testFunction).toThrow()

    spy.mockRestore();
}

test("Passing empty title", () => {
    render(<RecipeCardText title="" text="Body" />);
    const cardBody = screen.queryByText("Body")
    const cardTitle = cardBody.parentElement.parentElement.firstChild.firstChild.firstChild

    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()

    expect(cardTitle.textContent).toBe("");
    expect(cardBody.textContent).toBe("Body");
})

test("Passing empty text", () => {
    render(<RecipeCardText title="Header" text="" />);
    const cardTitle = screen.queryByText("Header")
    const cardBody = cardTitle.parentElement.parentElement.parentElement.lastChild.firstChild

    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()

    expect(cardTitle.textContent).toBe("Header");
    expect(cardBody.textContent).toBe("");
})

test("Passing header and text", () => {
    render(<RecipeCardText title="Header" text="Body" />);
    const cardTitle = screen.queryByText("Header")
    const cardBody = screen.queryByText("Body")

    expect(cardTitle).not.toBeNull()
    expect(cardBody).not.toBeNull()

    expect(cardTitle.textContent).toBe("Header");
    expect(cardBody.textContent).toBe("Body");
})

test("Passing no props", () => {
    expectToThrow(() => {render(<RecipeCardText />);});
})

test("Passing only valid title", () => {
    expectToThrow(() => {render(<RecipeCardText title="Heading" />);});
})

test("Passing only valid text", () => {
    expectToThrow(() => {render(<RecipeCardText text="Body" />);});
})

test("Passing title and null text", () => {
    expectToThrow(() => {render(<RecipeCardText title="Heading" text={null} />);});
})

test("Passing title and non-string text", () => {
    expectToThrow(() => {render(<RecipeCardText title="Heading" text={0} />);});
})

test("Passing null title and text", () => {
    expectToThrow(() => {render(<RecipeCardText title={null} text="Body" />);});
})

test("Passing non-string title and text", () => {
    expectToThrow(() => {render(<RecipeCardText title={0} text="Body" />);});
})
