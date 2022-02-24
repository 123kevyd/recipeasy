import { useState, useEffect } from 'react'

export default function Ingredients(props)
{
	// Expected props:
	// 		allIngredients
	// 		myIngredients
	// 		loading
	const myIngredients = props.ingredients
	const loading = props.loading

	const list = ingredients.map((ingredient) =>
		<li key={ingredient.id}>
			{ingredient.name}
		</li>
	);

	const search = (
		<Autocomplete
			freeSolo
			disableClearable
			renderInput={(params) => <TextField {...params} label='Search' />}
			options

	return (
		<div>
			<div>Hello world</div>
			list
		</div>
	)
}
