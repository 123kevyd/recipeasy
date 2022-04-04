import create from 'zustand'
console.log("importing zustand")

async function update(uid, field, ids){
	return fetch(`/api/user/${uid}/`, 
		{
			method: 'PUT',
			body: JSON.stringify({[field]: ids})
		})
}

function toggleLoading(field, id, setter, getter) {
	const item = `${field}${id}`
	const loadingSet = getter().loading
	if(loadingSet.has(item)){
		loadingSet.add(item)
	}else{
		loadingSet.delete(item)
	}
	setter((state) => ({ loading: new Set(loadingSet) }))
}

export const userStore = create((set, get) => ({
	uid: -1,
	recipes: [],
	ingredients: [],
	equipment: [],
	restrictions: [],
	loading: new Set(),

	init: ({ uid, recipes, ingredients, equipment, restrictions }) => set((state) => ({
			uid: uid,
			recipes: recipes,
			ingredients: ingredients,
			equipment: equipment,
			restrictions: restrictions
	})),
	isInitialized: () => get().uid > -1,

	add: (field, data) => async() => {
		const state = get()
		toggleLoading(field, data.id, set, get)
		set((state) => ({ [field]: state[field].concat([data]) }))
		var ids = state[field].map(datum => datum.id)

		const res = await update(state.uid, field, ids)
		toggleLoading(field, data.id, set, get)
		if(!res.ok){
			set((state) => ({ 
				[field]: state[field].filter((data2) => data != data2),
			}))
		}
	},

	del: (field, data) => async() => {
		console.log(field)
		console.log(data)
		toggleLoading(field, data.id, set, get)

		const state = get()
		console.log(state)
		var ids = state[field].map(datum => datum.id)
		ids.splice(ids.findIndex((id) => id == data.id), 1)
		ids = ids.filter((id) => id != null)
		const res = await update(state.uid, field, ids)
		if(res.ok){
			set((state) => ({
				[field]: state[field].filter((data2) => data.id != data2.id),
			}))
		}
		toggleLoading(field, data.id, set, get)

	},
	has: (field, id) => get()[field].some((data) => data.id == id)
}))
