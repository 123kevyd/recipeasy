import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

import {useEffect} from 'react'
export default function EntryDropdown(props) {
	return (
		<Stack spacing={2} sx={{ width: 1 }}>
			<Autocomplete
				disabled={props.disabled}
				fullWidth
				freeSolo
				options={props.items}
				getOptionLabel={item => item.title || item}
				filterSelectedOptions
				onChange={props.handler}
				autoHighlight
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search"
						InputProps={{
							...params.InputProps
						}} 
					/>
				)}
			/>
		</Stack>
	);
}

