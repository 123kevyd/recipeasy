import {render, screen} from "@testing-library/react"
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import RecipeDisplay from "../recipe_display";

// required to prevent jest from flooding the terminal with the intended error messages
function expectToThrow(testFunction) {
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation(() => {/* Intentionally left blank */});

    expect(testFunction).toThrow()

    spy.mockRestore();
}

function getTestRecipe() {
    const testRecipe = {
        id: 1,
        title: "header",
        description: "body",
        time: 30,
        tags: ["tag 1", "tag 2", "tag 3"],
        ingredients: [
            {id: "1", name: "ing 1", quantity: 1, unit: "unit 1"},
            {id: "2", name: "ing 2", quantity: 2, unit: "unit 2"},
            {id: "3", name: "ing 3", quantity: 3, unit: "unit 3"}
        ],
        directions: [
            "Step 1",
            "Step 2",
            "Step 3"
        ],
        equipment: ["equipment 1", "equipment 2"],
        reviews: [
            {id: "1", rating: 5, difficulty: 0, description: "Review 1"}
        ]
    };

    return JSON.parse(JSON.stringify(testRecipe));
}

test("Passing full recipe", () => {
    let recipe = getTestRecipe();

    render(<RecipeDisplay recipe={recipe} />);

    const title = screen.queryByText(recipe.title);
    const description = screen.queryByText(recipe.description);
    const time = screen.queryByText(`${recipe.time} mins`);
    const tag1 = screen.queryByText(recipe.tags[0]);
    const tag2 = screen.queryByText(recipe.tags[1]);
    const tag3 = screen.queryByText(recipe.tags[2]);
    const ingredient1 = screen.queryByText(`${recipe.ingredients[0].quantity} ${recipe.ingredients[0].unit} ${recipe.ingredients[0].name}`);
    const ingredient2 = screen.queryByText(`${recipe.ingredients[1].quantity} ${recipe.ingredients[1].unit} ${recipe.ingredients[1].name}`);
    const ingredient3 = screen.queryByText(`${recipe.ingredients[2].quantity} ${recipe.ingredients[2].unit} ${recipe.ingredients[2].name}`);
    const equipment1 = screen.queryByText(recipe.equipment[0]);
    const equipment2 = screen.queryByText(recipe.equipment[1]);
    const direction1 = screen.queryByText(recipe.directions[0]);
    const direction2 = screen.queryByText(recipe.directions[1]);
    const direction3 = screen.queryByText(recipe.directions[2]);
    const reviewText = screen.queryByText(recipe.reviews[0].description);


    expect(title).not.toBeNull()
    expect(description).not.toBeNull()
    expect(time).not.toBeNull()
    expect(tag1).not.toBeNull()
    expect(tag2).not.toBeNull()
    expect(tag3).not.toBeNull()
    expect(ingredient1).not.toBeNull()
    expect(ingredient2).not.toBeNull()
    expect(ingredient3).not.toBeNull()
    expect(equipment1).not.toBeNull()
    expect(equipment2).not.toBeNull()
    expect(direction1).not.toBeNull()
    expect(direction2).not.toBeNull()
    expect(direction3).not.toBeNull()

    expect(reviewText).toBeNull()
})

test("Passing no props", () => {
    expectToThrow(() => {render(<RecipeDisplay />);});
})

test("Passing null recipe", () => {
    expectToThrow(() => {render(<RecipeDisplay recipe={null} />);});
})

test("Passing empty object for recipe", () => {
    expectToThrow(() => {render(<RecipeDisplay recipe={{}} />);});
})

test("Passing recipe without title", () => {
    let recipe = getTestRecipe();
    delete recipe["title"];
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe with non-string title", () => {
    let recipe = getTestRecipe();
    recipe["title"] = 100;
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe without description", () => {
    let recipe = getTestRecipe();
    delete recipe["description"];
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe with non-string description", () => {
    let recipe = getTestRecipe();
    recipe["description"] = 100;
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe without time", () => {
    let recipe = getTestRecipe();
    delete recipe["time"];
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe with non-number time", () => {
    let recipe = getTestRecipe();
    recipe["time"] = "100";
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe without tags", () => {
    let recipe = getTestRecipe();
    delete recipe["tags"];
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe with non-array tags", () => {
    let recipe = getTestRecipe();
    recipe["tags"] = {};
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe without ingredients", () => {
    let recipe = getTestRecipe();
    delete recipe["ingredients"];
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe with non-array ingredients", () => {
    let recipe = getTestRecipe();
    recipe["ingredients"] = {};
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe without equipment", () => {
    let recipe = getTestRecipe();
    delete recipe["equipment"];
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe with non-array equipment", () => {
    let recipe = getTestRecipe();
    recipe["equipment"] = {};
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe without directions", () => {
    let recipe = getTestRecipe();
    delete recipe["directions"];
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})

test("Passing recipe with non-array directions", () => {
    let recipe = getTestRecipe();
    recipe["directions"] = {};
    expectToThrow(() => {render(<RecipeDisplay recipe={recipe} />);});
})
