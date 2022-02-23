import { useState, useEffect } from 'react'
export default function Kitchen(props) {
	// Expecting props: 
	// 		myRecipes
	// 		recipesLoading
	// 		ingredients
	// 		ingredientsLoading

	const kitchen = (
		<Box sx={{ 
			display: 'flex',
			flexWrap: 'wrap',
			flexDirection: 'row',
			justifyContent: 'center',
			bgcolor: 'background.paper',
			alignItems: 'stretch',
			borderRadius: 1,
		}}
		>
			<Ingredients data={user_data.ingredients} loading={userDataLoading} />
			<Equipment data={user_data.equipment} loading={userDataLoading} />
			<Restrictions data={user_data.restrictions} loading={userDataLoading} />
			<MyRecipes data={props.recipes} loading={userDataLoading} />
		</Box>
	)

	return kitchen
}
