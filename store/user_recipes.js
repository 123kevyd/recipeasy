import create from 'zustand'

async function update(uid, ids){
	return fetch(`/api/user/${uid}/`, 
		{
			method: 'PUT',
			body: JSON.stringify({recipes: ids})
		})
}

export const userRecipesStore = create((set, get) => ({
	uid: -1,
	recipes: [],
	loadingRecipes: [],

	init: (uid, recipes) => set((state) => ({ uid: uid, recipes: recipes })),
	isInitialized: () => get().uid > -1,

	addRecipe: (recipe) => async() => {
		set((state) => ({ loadingRecipes: state.loadingRecipes.concat([recipe.id]) }))
		set((state) => ({ recipes: state.recipes.concat([recipe]) }))
		const state = get()
		var ids = state.recipes.map(recipe => recipe.id)

		const res = await update(state.uid, ids)
		if(res.ok){
			set((state) => ({ loadingRecipes: state.loadingRecipes.filter((id) => recipe.id != id) }))
		}else{
			set((state) => ({ 
				loadingRecipes: state.loadingRecipes.filter((id) => recipe.id != id),
				recipes: state.recipes.filter((recipe2) => recipe != recipe2),
			}))
		}
	},

	delRecipe: (recipe1) => async() => {
		set((state) => ({ loadingRecipes: state.loadingRecipes.concat([recipe1.id]) }))
		const state = get()
		var ids = state.recipes.map(recipe => recipe.id)
		ids.splice(ids.findIndex((id) => id == recipe1.id), 1)
		ids = ids.filter((id) => id != null)
		const res = await update(state.uid, ids)
		if(res.ok){
			set((state) => ({
				recipes: state.recipes.filter((recipe2) => recipe1.id != recipe2.id),
				loadingRecipes: state.loadingRecipes.filter((id) => recipe1.id != id)
			}))
		}
		set((state) => ({ loadingRecipes: state.loadingRecipes.filter((id) => recipe1.id != id) }))

	},
	has: (id) => get().recipes.some((recipe) => recipe.id == id)
}))
