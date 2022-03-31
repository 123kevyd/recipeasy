import { queryAllByTestId, render, screen } from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import RecipeRatingDisplay from '../recipe_rating_display';
import { ratingClasses } from '@mui/material';

// required to prevent jest from flooding the terminal with the intended error messages
function expectToThrow(testFunction) {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    expect(testFunction).toThrow()

    spy.mockRestore();
}

function getTestReviews() {
    const testReviews = [
        { id: "1", rating: 5, difficulty: 3, description: "Review 1" },
        { id: "2", rating: 3, difficulty: 0, description: "Review 2" },
        { id: "3", rating: 0, difficulty: 5, description: "Review 3" }
    ];

    return JSON.parse(JSON.stringify(testReviews));
}

test("Passing one review", () => {
    let review = [ getTestReviews()[0] ]

    render(<RecipeRatingDisplay reviews={review} />);

    const description = screen.queryByText(review[0].description)
    const ratingStars = description.parentElement.firstChild.firstChild
    const difficultyStars = description.parentElement.firstChild.lastChild

    expect(description).not.toBeNull()
    expect(ratingStars).not.toBeNull()
    expect(difficultyStars).not.toBeNull()

    expect(ratingStars.childElementCount).toBe(6)
    expect(difficultyStars.childElementCount).toBe(6)

    expect(queryAllByTestId(ratingStars, "StarIcon").length).toBe(5)
    expect(queryAllByTestId(ratingStars, "StarBorderIcon").length).toBe(0)
    expect(queryAllByTestId(difficultyStars, "StarIcon").length).toBe(3)
    expect(queryAllByTestId(difficultyStars, "StarBorderIcon").length).toBe(2)
})

test("Passing many review", () => {
    let reviews = getTestReviews()

    render(<RecipeRatingDisplay reviews={reviews} />);

    const description1 = screen.queryByText(reviews[0].description)
    const description2 = screen.queryByText(reviews[1].description)
    const description3 = screen.queryByText(reviews[2].description)
    const ratingStars1 = description1.parentElement.firstChild.firstChild
    const ratingStars2 = description2.parentElement.firstChild.firstChild
    const ratingStars3 = description3.parentElement.firstChild.firstChild
    const difficultyStars1 = description1.parentElement.firstChild.lastChild
    const difficultyStars2 = description2.parentElement.firstChild.lastChild
    const difficultyStars3 = description3.parentElement.firstChild.lastChild

    expect(description1).not.toBeNull()
    expect(description2).not.toBeNull()
    expect(description3).not.toBeNull()
    expect(ratingStars1).not.toBeNull()
    expect(ratingStars2).not.toBeNull()
    expect(ratingStars3).not.toBeNull()
    expect(difficultyStars1).not.toBeNull()
    expect(difficultyStars2).not.toBeNull()
    expect(difficultyStars3).not.toBeNull()

    expect(ratingStars1.childElementCount).toBe(6)
    expect(ratingStars2.childElementCount).toBe(6)
    expect(ratingStars3.childElementCount).toBe(6)
    expect(difficultyStars1.childElementCount).toBe(6)
    expect(difficultyStars2.childElementCount).toBe(6)
    expect(difficultyStars3.childElementCount).toBe(6)

    expect(queryAllByTestId(ratingStars1, "StarIcon").length).toBe(5)
    expect(queryAllByTestId(ratingStars1, "StarBorderIcon").length).toBe(0)
    expect(queryAllByTestId(ratingStars2, "StarIcon").length).toBe(3)
    expect(queryAllByTestId(ratingStars2, "StarBorderIcon").length).toBe(2)
    expect(queryAllByTestId(ratingStars3, "StarIcon").length).toBe(0)
    expect(queryAllByTestId(ratingStars3, "StarBorderIcon").length).toBe(5)

    expect(queryAllByTestId(difficultyStars1, "StarIcon").length).toBe(3)
    expect(queryAllByTestId(difficultyStars1, "StarBorderIcon").length).toBe(2)
    expect(queryAllByTestId(difficultyStars2, "StarIcon").length).toBe(0)
    expect(queryAllByTestId(difficultyStars2, "StarBorderIcon").length).toBe(5)
    expect(queryAllByTestId(difficultyStars3, "StarIcon").length).toBe(5)
    expect(queryAllByTestId(difficultyStars3, "StarBorderIcon").length).toBe(0)
})

test("Passing no props", () => {
    expectToThrow(() => {render(<RecipeRatingDisplay />);});
})

test("Passing empty object", () => {
    expectToThrow(() => {render(<RecipeRatingDisplay reviews={{}} />);});
})

test("Passing no rating", () => {
    let reviews = getTestReviews()
    delete reviews[0].rating

    expectToThrow(() => {render(<RecipeRatingDisplay reviews={reviews} />);});
})

test("Passing non-number rating", () => {
    let reviews = getTestReviews()
    reviews[0].rating = "123"

    expectToThrow(() => {render(<RecipeRatingDisplay reviews={reviews} />);});
})

test("Passing no difficulty", () => {
    let reviews = getTestReviews()
    delete reviews[0].difficulty

    expectToThrow(() => {render(<RecipeRatingDisplay reviews={reviews} />);});
})

test("Passing non-number difficulty", () => {
    let reviews = getTestReviews()
    reviews[0].difficulty = "123"

    expectToThrow(() => {render(<RecipeRatingDisplay reviews={reviews} />);});
})

test("Passing no description", () => {
    let reviews = getTestReviews()
    delete reviews[0].rating

    expectToThrow(() => {render(<RecipeRatingDisplay reviews={reviews} />);});
})

test("Passing non-string description", () => {
    let reviews = getTestReviews()
    reviews[0].rating = 123

    expectToThrow(() => {render(<RecipeRatingDisplay reviews={reviews} />);});
})