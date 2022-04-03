import { render, screen } from '@testing-library/react'
import React from 'react';
import AddRecipeDescription from '../add_recipe_description_comp'
import '@testing-library/jest-dom/extend-expect';

test("Passing empty title", () => {
    const handle = jest.fn()

    const x = render(<AddRecipeDescription handleChange={handle} />);
    console.log(x);
    //fireEvent.click(closeButton)
    //expect(handleClick).toHaveBeenCalledTimes(1)
})