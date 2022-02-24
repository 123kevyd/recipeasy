import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BrowseRecipes from './browse_recipes/[browse_recipes]'

export default function Home() {
	const [ingredients, setIngredients] = useState(null)

	useEffect(() => {
		fetch('api/ingredients')
			.then((res) => res.json())
			.then((data) => {
				setIngredients(data)
			})
	}, [])

	// if (!ingredients) return <p>No profile data</p>
	// const list = ingredients.map((ingredient) =>
	// <li key={ingredient.id}>
	// 	{ingredient.name}
	// </li>
	// );
	let list
	if (ingredients) {
		list = ingredients.map((ingredient) =>
			<li key={ingredient.id}>
				{ingredient.name}
			</li>
		);
	} else {
		list = <p>No profile data</p>
	}
	

	return (
		<div>
			<BrowseRecipes></BrowseRecipes>
			<div>Hello world</div>
			list

		</div>
	)
}
