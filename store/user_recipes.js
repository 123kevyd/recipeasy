import create from 'zustand'

export const userRecipesStore = create((set) => ({
	myRecipes: [],
	loadingRecipes: [],
	init: (recipes) => set((state) => ({ myRecipes: recipes })),
	addRecipe: (recipe) => {
		console.log('saving recipe')
		set((state) => ({ myRecipes: myRecipes.concat([recipe]) }))
	},
	delRecipe: (recipe1) => set((state) => ({ myRecipes: myRecipes.filter((recipe2) =>
		recipe1.id != recipe2
	)})),
	has: (id) => () => myRecipes.some((recipe) => recipe.id == id)
}))
