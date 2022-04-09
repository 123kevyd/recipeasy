import create from 'zustand'

async function update(uid, field, ids){
	return fetch(`/api/user/${uid}`, 
		{
			method: 'PUT',
			body: JSON.stringify({[field]: ids})
		})
}

// this should possibly be in a file with wider design scope, this file is about users, this method is about items
async function postNewItem(field, title) {
	return fetch(`/api/${field}`, {method: 'POST', body: JSON.stringify({price: 0, name: title})})
}

function toggleLoading(item, setter, getter) {
	const loadingSet = new Set(getter().loading)
	if(loadingSet.has(item)){
		loadingSet.delete(item)
	}else{
		loadingSet.add(item)
	}
	setter((state) => ({ loading: loadingSet }))
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

	add: async(field, data) => {
		// careful, future calls to set() will not change the value of this 'state' variable
		// to do so you must call get() again
		const state = get() 
		const currItems = state[field]
		if(!data.id){
			// new item, send to category db
			const newItem = {title: data}
			toggleLoading(newItem, set, get)
			set((state) => ({ [field]: state[field].concat([newItem]) }))
			const res = await postNewItem(field, data)
			if(!res.ok){
				set((state) => ({ 
					[field]: currItems
				}))
				toggleLoading(newItem, set, get)
				return null
			}
			data = (await res.json())[0]
			console.log('posted data')
			console.log(data)
			toggleLoading(newItem, set, get)
		}
		console.log("putting to user")
		toggleLoading(data, set, get)
		var ids = currItems.map(datum => datum.id)
		ids.push(data.id)
		set((state) => ({ [field]: currItems.concat([data]) }))
		var res = await update(state.uid, field, ids)
		toggleLoading(data, set, get)
		if(!res.ok){
			set((state) => ({ 
				[field]: currItems.filter((data2) => data != data2),
			}))
		}
	},

	del: async(field, data) => {
		toggleLoading(data, set, get)
		const state = get()
		var ids = state[field].map(datum => datum.id)
		ids.splice(ids.findIndex((id) => id == data.id), 1)
		ids = ids.filter((id) => id != null)
		const res = await update(state.uid, field, ids)
		if(res.ok){
			set((state) => ({
				[field]: state[field].filter((data2) => data.id != data2.id),
			}))
		}
		toggleLoading(data, set, get)

	},
	has: (field, id) => get()[field].some((data) => data.id == id),
	isLoading: (item) => get().loading.has(item),
}))
