import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AddRecipeEquipment from '../add_recipe_equipment';

test("Checking Method Is called On Change", () => {
    const curr = [""]
    const equipment = [{
        id: 1,
        title: "whisk"
    }]
    const handle = jest.fn()
    
    render(<AddRecipeEquipment handleContent={handle} equipment={equipment} currEquipment={curr}/>)
    const toClick = screen.getAllByRole('button')
    fireEvent.mouseDown(toClick[0])
    const option = screen.getByRole('option')
    fireEvent.click(option)
    
    expect(handle).toBeCalledTimes(1)
})