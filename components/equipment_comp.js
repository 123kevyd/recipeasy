import { useState, useEffect } from "react"
import EntryDropdown from "./entry_dropdown_comp"
import KitchenList from "./kitchen_list_comp"
import Stack from "@mui/material/Stack"

export default function Equipment(props) {

	const [ myEquipment, setMyEquipment ] = useState(props.myEquipment)

	const getDropdownList = () => {
		return props.equipment.filter( equipment1 => {
			const found = myEquipment.some( equipment2 =>
				equipment1.title === equipment2.title
			)
			return ! found
		})
	}

	const [ dropdownList, setDropdownList ] = useState(getDropdownList())

	const equipmentSelected = (event, value) => {
		setMyEquipment(myEquipment.concat([value]))
		setDropdownList(getDropdownList())
	}

	const deleteEquipment = (equipment1) => {
		setMyEquipment(myEquipment.filter(equipment2 => {
			return equipment1.title !== equipment2.title
		}))
		setDropdownList(getDropdownList())
	}

	return (
		<Stack spacing={2} sx={{ width: 300, padding: 3, border: '1px blue solid', margin: 3 }}>
			<EntryDropdown
				items={getDropdownList()}
				handler={equipmentSelected}
			/>
			<KitchenList items={myEquipment} delHandler={deleteEquipment}/>
		</Stack>
	)
			
}

