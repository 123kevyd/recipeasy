import List from "@mui/material/List"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/ListItemIcon"
import LinearProgress from "@mui/material/LinearProgress"

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
	const listItems = (
		props.items.map(item => 
			<div>
				<ListItem
					key={`${item.title}${props.loading.has(item.title)}`}
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
				{ props.loading.has(item.title) && <LinearProgress sx={{marginBotton: '-4px'}} />}
			</div>
		)
	)

	return (
		<List dense={true}>
			{listItems}
		</List>
	)
}
