import IconButton from "@mui/material/ListItemIcon"
import DeleteIcon from "@mui/icons-material/Delete"

export default function DelButton({onClick, item, disabled}) {
	const handleDel = () => {
		if (onClick){
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
