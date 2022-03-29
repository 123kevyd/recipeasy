import { useState, useEffect, Component } from 'react'
import { useRouter } from 'next/router'
import FormControl from '@material-ui/core/FormControl'
import LinearProgress from '@mui/material/LinearProgress'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
//

export default function Login(props) {
	const router = useRouter()
	const [username, setUsername] = useState('')
	const [loading, setLoading] = useState(false)

	const handleChange = (event) => {
		setUsername(event.currentTarget.value)
	}

	const loginClicked = () => {
		if(username != ""){
			setLoading(true)
			fetch(`api/user/${username}`)
				.then((res) => {
					if(res.ok){
						const data = res.json().then((data) => {
							router.push(`/user/${data.id}`)
						})
					}else{
						setLoading(false)
					}
				})
		}
	}

	return (
		<Box>
			<Box
				sx={{
					textAlign: 'center',
					marginTop: 10,
					marginBottom: 5
				}}
			>
				<h1>
					Recipeasy
				</h1>
			</Box>
			<Box className="loginForm"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						margin: '20px',
						padding: '20px 30px',
						borderWidth: '2px',
						borderRadius: '12px',
						bgcolor: 'lightgreen'
					}}
				>
					<form>
						<InputLabel>
							User Name
						</InputLabel>
						<Input
							id="username"
							onChange={handleChange}
							type="text"
						>
						</Input><br />

						<Button disabled={loading} onClick={loginClicked} type="button" color="default" className="loginForm__login-button">
							log in
						</Button>
					</form>
					{loading && 
						<LinearProgress sx={{marginBottom: '-4px'}} color="success" />
					}
				</Box>
			</Box>
		</Box>
	)
}

