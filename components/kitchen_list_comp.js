import List from "@mui/material/List"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/ListItemIcon"

function DelButton({onClick, item}) {
	
	const handleDel = () => {
		if(onClick){
			onClick(item)
		}
	}
	return (
		<IconButton edge="end" aria-label="delete"
			onClick={handleDel}
		>
			<DeleteIcon />
		</IconButton>
	)
}

export default function KitchenList(props) {
	//const deleteIngredient = (ingredient) => {
		//props.delHandler(ingredient)
	//}
	const listItems = (
		props.items.map(item => 
			<ListItem
				key={item.title}
				secondaryAction={
					<DelButton 
						onClick={props.delHandler}
						item={item}
						/>
				}
			>
				<ListItemText
					primary={ item.title }
				/>
			</ListItem>
		)
	)

	return (
		<List dense={true}>
			{listItems}
		</List>
	)
}
