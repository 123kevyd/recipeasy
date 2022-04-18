import {useState} from "react"
import {Typography, Stack, List, ListItem, ListItemText, LinearProgress} from '@mui/material/'
import EntryDropdown from "./entry_dropdown"
import DelButton from "./del_button"
import {userStore} from "/store/user_store"

function KitchenListItem(props) {
	const item = props.item
	return (
		<div>
			<ListItem
				secondaryAction={
					<DelButton
						disabled={props.loading}
						onClick={props.delHandler}
						item={item}
						/>
				}
			>
				<ListItemText
					id={item.title}
					sx={{color: props.loading ? 'text.disabled' : 'black'}}
					primary={ item.title }
				/>
			</ListItem>
			{ props.loading && <LinearProgress sx={{marginBotton: '-4px'}} />}
		</div>
	)
}


export default function KitchenCategory(props) {
	const myItems = userStore(state => state[props.field])
	const [items, _setItems] = useState(props.items)
	const [clearText, setClearText] = useState(true)
	const addItem = userStore(state => state.add)
	const delItem = userStore(state => state.del)
	const loadingItems = userStore(state => state.loading)

	const getDropdownList = () => {
		return items.filter( item1 => {
			const found = myItems.some( item2 =>
				item1.title === item2.title
			)
			return ! found
		})
	}
	const [_dropdownList, setDropdownList] = useState(getDropdownList())
	const refreshDropdownList = () => {
		setDropdownList(getDropdownList())
	}


	const itemSelected = async (_event, value) => {
		setClearText(!clearText)
		if (value == null){
			return false
		}
		await addItem(props.field, value)
		refreshDropdownList()
	}

	const deleteItem = async (item1) => {
		await delItem(props.field, item1)
		refreshDropdownList()
	}

	const kitchenList = (
		myItems.map(item => {
			var isLoading = loadingItems.has(item)
			return (
				<KitchenListItem
					key={`${item.id}`}
					item={item}
					loading={isLoading}
					field={props.field}
					delHandler={deleteItem}
				/>
			)
		})
	)

	return (
		<Stack spacing={2} sx={{width: 300, padding: 3, border: '1px blue solid', margin: 3}}>
			<Typography  align="center" variant="h5" component="div">{props.title}</Typography>
			<EntryDropdown textFieldId={`autocomplete-${props.field}`}
				items={getDropdownList()}
				handler={itemSelected}
				key={clearText}
			/>
			<List dense={true}>
				{kitchenList}
			</List>
		</Stack>
	)
}
