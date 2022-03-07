import { useState, useEffect } from "react"
import EntryDropdown from "./entry_dropdown_comp"
import KitchenList from "./kitchen_list_comp"
import Stack from "@mui/material/Stack"

export default function Restrictions(props) {

	const [ myRestrictions, setMyRestrictions ] = useState(props.myRestrictions)

	const getDropdownList = () => {
		return props.restrictions.filter( restriction1 => {
			const found = myRestrictions.some( restriction2 =>
				restriction1.title === restriction2.title
			)
			return ! found
		})
	}

	const [ dropdownList, setDropdownList ] = useState(getDropdownList())

	const restrictionSelected = (event, value) => {
		setMyRestrictions(myRestrictions.concat([value]))
		setDropdownList(getDropdownList())
	}

	const deleteRestriction = (restriction1) => {
		setMyRestrictions(myRestrictions.filter(restriction2 => {
			return restriction1.title !== restriction2.title
		}))
		setDropdownList(getDropdownList())
	}

	return (
		<Stack spacing={2} sx={{ width: 300, padding: 3, border: '1px blue solid', margin: 3 }}>
			<EntryDropdown
				items={getDropdownList()}
				handler={restrictionSelected}
			/>
			<KitchenList items={myRestrictions} delHandler={deleteRestriction}/>
		</Stack>
	)
			
}
