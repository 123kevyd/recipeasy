import { useState, useEffect, Component } from 'react'
import { useRouter } from 'next/router'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
//

export default function Login(props) {
	const [username, setUsername] = useState('')

	const handleChange = (event) => {
		setUsername({ [event.currentTarget.id]: event.currentTarget.value })
	}

	const loginClicked = () => {
		if(username != ""){
			fetch('api/user/[user]')
				.then((res) => res.json)
				.then((data) => {
					console.log(data)
					router.push(`/user/${data.id}`)
				})
		}
	}

	return (
		<div className="Login">
			<form className="loginForm">
				<InputLabel>
					User Name
				</InputLabel>
				<Input
					id="username"
					onChange={handleChange}
					type="text"
				>
				</Input>
				<Button onClick={loginClicked} type="button" color="primary" className="loginForm__login-button">
					log in
				</Button>
			</form>
		</div>
	)
}

