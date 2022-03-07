import { useState, useEffect, Component } from 'react'
import { router } from 'next/router'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
//

export default class Login extends Component {
	constructor (props) {
		super(props)

		this.state = {
			username: ""
		}

		this.loginClicked = this.loginClicked.bind(this)
	}

	handleChange = (event) => {
		this.setState({ [event.currentTarget.id]: event.currentTarget.value })
	}



	async loginClicked(event) {
		console.log(event)
		console.log(this.state)
		if(this.state.username != ""){
			await fetch('api/user/[user]')
				.then((res) => res.json)
				.then((data) => {
					console.log(data)
					router.push(`/user/${data.id}`)
				})
		}
	}

	render() {
		return (
			<div className="Login">
				<form className="loginForm">
					<InputLabel>
						User Name
					</InputLabel>
					<Input
						id="username"
						onChange={this.handleChange}
						type="text"
					>
					</Input>
					<Button onClick={this.loginClicked} type="button" color="primary" className="loginForm__login-button">
						log in
					</Button>
				</form>
			</div>
		)
	}
}

