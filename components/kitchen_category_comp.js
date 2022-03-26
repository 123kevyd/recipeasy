import { useState, useEffect } from "react"
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import EntryDropdown from "./entry_dropdown_comp"
import KitchenList from "./kitchen_list_comp"
import Stack from "@mui/material/Stack"

export default function KitenCategory(props) {

	const [ myItems, setMyItems ] = useState(props.myItems)
	const [ items, setItems ] = useState(props.items)
	const router = useRouter()
	const uid = router.query.uid

	const getDropdownList = () => {
		return props.items.filter( item1 => {
			const found = myItems.some( item2 =>
				item1.title === item2.title
			)
			return ! found
		})
	}

	const [ dropdownList, setDropdownList ] = useState(getDropdownList())

	const itemSelected = async (event, value) => {
		if(!props.items.some(item => item.title == value)){
			// save to items and to user
			await fetch(`/api/${props.endpoint}/`, {method: 'POST', body: JSON.stringify({price: 0, name: value})})
				.then((res) => res.json())
				.then((data) => {
					const id = data[0].id
					var itemIds = myItems.map(item => item.id)
					itemIds = itemIds.filter(item => item != null)
					itemIds.push(id)
					fetch(`/api/user/${uid}/`, 
						{
							method: 'PUT',
							body: JSON.stringify({[props.field]: itemIds})
						}
					).then(() =>
						{
							setItems(items.concat([{id: id, name: value}]))
							setMyItems(myItems.concat([{id:id, title: value}]))
							setDropdownList(getDropdownList())
						}
					)
				})
		}else{
			var itemIds = myItems.map(item => item.id)
			itemIds = itemIds.filter(item => item != null)
			itemIds.push(value.id)
			await fetch(`/api/user/${uid}/`, 
				{
					method: 'PUT',
					body: {[props.field]: itemIds}
				}
			)
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
			/>
			<KitchenList items={myItems} delHandler={deleteItem}/>
		</Stack>
	)
			
}
