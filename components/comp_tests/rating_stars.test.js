import {render, screen} from '@testing-library/react'
import React from 'react';
import RatingStars from '../rating_stars'
import '@testing-library/jest-dom/extend-expect';

// required to prevent jest from flooding the terminal with the intended error messages
function expectToThrow(testFunction) {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {/* Intentionally left blank */});

    expect(testFunction).toThrow()

    spy.mockRestore();
}

test("Passing zero stars", () => {
    render(<RatingStars stars={0} />);
    const borderStars = screen.queryAllByTestId("StarBorderIcon")
    const filledStars = screen.queryAllByTestId("StarIcon")
    expect(borderStars.length).toBe(5)
    expect(filledStars.length).toBe(0)
})

test("Passing one stars", () => {
    render(<RatingStars stars={1} />);
    const borderStars = screen.queryAllByTestId("StarBorderIcon")
    const filledStars = screen.queryAllByTestId("StarIcon")
    expect(borderStars.length).toBe(4)
    expect(filledStars.length).toBe(1)
})

test("Passing five stars", () => {
    render(<RatingStars stars={5} />);
    const borderStars = screen.queryAllByTestId("StarBorderIcon")
    const filledStars = screen.queryAllByTestId("StarIcon")
    expect(borderStars.length).toBe(0)
    expect(filledStars.length).toBe(5)
})

test("Passing null stars", () => {
    expectToThrow(() => {render(<RatingStars stars={null} />);});
})

test("Passing string stars", () => {
    expectToThrow(() => {render(<RatingStars stars={"1"} />);});
})

test("Passing too many stars", () => {
    expectToThrow(() => {render(<RatingStars stars={6} />);});
})

test("Passing too few stars", () => {
    expectToThrow(() => {render(<RatingStars stars={-1} />);});
})
