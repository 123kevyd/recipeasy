import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
	const [ingredients, setIngredients] = useState(null)

	useEffect(() => {
		fetch('api/ingredients')
			.then((res) => res.json())
			.then((data) => {
				setIngredients(data)
			})
	}, [])

	if (!ingredients) return <p>No profile data</p>

	const list = ingredients.map((ingredient) =>
		<li key={ingredient.id}>
			{ingredient.name}
		</li>
	);

	return (
		<div>
			<div>Hello world</div>
			{list}
		</div>
	)
}
