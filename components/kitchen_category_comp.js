import { useState, useEffect } from "react"
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import EntryDropdown from "./entry_dropdown_comp"
import KitchenList from "./kitchen_list_comp"
import Stack from "@mui/material/Stack"

export default function KitchenCategory(props) {

	// using the drilled-down props and setters
	// causes an issue where the dropdown and item list doesn't update
	// later will need to replace items and myItems getters and setters with the drilled-down versions
	const [myItems, setMyItems] = useState(props.myItems)
	const [items, setItems] = useState(props.items)
	const [clearText, setClearText] = useState(true)
	const [loadingItemTitles, setLoadtingItemTitles] = useState(new Set())
	const toggleLoadingItemTitle = (title) => {
		if(loadingItemTitles.has(title)){
			loadingItemTitles.delete(title)
		}else{
			loadingItemTitles.add(title)
		}
		setLoadtingItemTitles(loadingItemTitles)
	}


	const router = useRouter()
	const uid = router.query.uid

	const getDropdownList = () => {
		return items.filter( item1 => {
			const found = myItems.some( item2 =>
				item1.title === item2.title
			)
			return ! found
		})
	}

	const [ dropdownList, setDropdownList ] = useState(getDropdownList())
	const addIdToUserList = (id) => {
		var itemIds = myItems.map(item => item.id)
		itemIds = itemIds.filter(item => item != null)
		itemIds.push(id)
		return fetch(`/api/user/${uid}/`, 
			{
				method: 'PUT',
				body: JSON.stringify({[props.field]: itemIds})
			})
	}

	const itemSelected = async (event, value) => {
		setClearText(!clearText)
		if(value == null){
			return false
		}
		if(typeof value == 'string'){
			// save to items and to user
			toggleLoadingItemTitle(value)
			await fetch(`/api/${props.endpoint}/`, {method: 'POST', body: JSON.stringify({price: 0, name: value})})
				.then((res) => res.json())
				.then((data) => {
					const id = data[0].id
					addIdToUserList(id)
						.then(() =>
						{
							const newItem = {id: id, title: value}
							setItems(items.concat([newItem]))
							setMyItems(myItems.concat([newItem]))
							setDropdownList(getDropdownList())
						}
					)
				})
		}else{
			toggleLoadingItemTitle(value.title)
			addIdToUserList(value.id)
			setMyItems(myItems.concat([value]))
			setDropdownList(getDropdownList())
		}
		// todo: check if the request was successful
	}

	const deleteItem = async (item1) => {
		var itemIds = myItems.map(item => item.id)
		itemIds.splice(itemIds.findIndex((id) => id == item1.id), 1)
		itemIds = itemIds.filter((id) => id != null)
		await fetch(`/api/user/${uid}/`, 
			{
				method: 'PUT',
				body: JSON.stringify({[props.field]: itemIds})
			}
		)
		setMyItems(myItems.filter(item2 => {
			return item1.title !== item2.title
		}))
		setDropdownList(getDropdownList())
	}

	return (
		<Stack spacing={2} sx={{ width: 300, padding: 3, border: '1px blue solid', margin: 3 }}>
			<Typography align="center" variant="h5" component="div">{props.title}</Typography>
			<EntryDropdown
				items={getDropdownList()}
				handler={itemSelected}
				key={clearText}
			/>
			<KitchenList loading={loadingItemTitles} items={myItems} delHandler={deleteItem}/>
		</Stack>
	)
			
}
