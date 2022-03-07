import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

import {useEffect} from 'react'
export default function EntryDropdown(props) {
	return (
		<Stack spacing={2} sx={{ width: 300 }}>
			<Autocomplete
				sx={{ width: 0.75 }}
				freeSolo
				options={props.items}
				getOptionLabel={item => item.title}
				filterSelectedOptions
				//options={ingredients.map((option) => option.title)}
				onChange={props.handler}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search"
						InputProps={{
							...params.InputProps,
								type: 'search',
							}}
					/>
				)}
			/>
		</Stack>
	);
}

