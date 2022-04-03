import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import LinearProgress from "@mui/material/LinearProgress"
import DelButton from "./delete_button"

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
