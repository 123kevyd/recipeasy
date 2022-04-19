import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

export default function EntryDropdown(props) {
	return (
		<Stack spacing={2} sx={{width: 1}}>
			<Autocomplete
				disabled={props.disabled}
				fullWidth
				freeSolo
				options={props.items}
				getOptionLabel={item => item.title || item}
				filterSelectedOptions
				onChange={props.handler}
				autoHighlight
				id={props.textFieldId}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search"
						autoFocus
						InputProps={{
							...params.InputProps
						}}
					/>
				)}
			/>
		</Stack>
	);
}

