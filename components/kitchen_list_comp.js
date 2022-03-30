import List from "@mui/material/List"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/ListItemIcon"
import LinearProgress from "@mui/material/LinearProgress"

function DelButton({onClick, item, disabled}) {
	
	const handleDel = () => {
		if(onClick){
			onClick(item)
		}
	}
	return (
		<IconButton edge="end" aria-label="delete"
			disabled={disabled ? true : undefined}
			onClick={handleDel}
		>
			<DeleteIcon color={disabled ? 'disabled' : 'default'}/>
		</IconButton>
	)
}

export default function KitchenList(props) {
	const listItems = (
		props.items.map(item => {
			var loading = props.loading.has(item.title)
			return (
				<div key={`${item.title}${loading}`}>
					<ListItem
						secondaryAction={
							<DelButton 
								disabled={loading}
								onClick={props.delHandler}
								item={item}
								/>
						}
					>
						<ListItemText
							sx={{color: loading ? 'text.disabled' : 'black'}}
							primary={ item.title }
						/>
					</ListItem>
					{ loading && <LinearProgress sx={{marginBotton: '-4px'}} />}
				</div>
			)
		})
	)

	return (
		<List dense={true}>
			{listItems}
		</List>
	)
}
