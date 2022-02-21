
import * as React from 'react'
import { useRouter } from 'next/router'
import Cookbook from '../../components/kitchen'
import Recipes from '../../components/recipes'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

function TabPanel(props) {
	// https://codesandbox.io/s/x5uvxj?file=/demo.js
	const {value, index, children } = props

	return (
		<div hidden={value !== index}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	)
}

function App() {
	const router = useRouter()
	const user_id = router.query.uid
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} centered>
					<Tab label="Cookbook" />
					<Tab label="Recipes" />
					<Tab label="Meal Planner" disabled />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<Kitchen />
			</TabPanel>
			<TabPanel value={value} index={0}>
				<Recipes />
			</TabPanel>
			<TabPanel value={value} index={0}>
			</TabPanel>
		</Box>
	)
}

export default App
