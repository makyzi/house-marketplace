import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'

import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { db } from '../firebase.config.js'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import OAuth from '../components/OAuth'

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const { email, password, name } = formData

	const navigate = useNavigate()

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		try {
			const auth = getAuth()

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user

			updateProfile(auth.currentUser, {
				displayName: name,
			})

			const formDataCopy = { ...formData }
			delete formDataCopy.password
			formDataCopy.timestamp = serverTimestamp()

			await setDoc(doc(db, 'users', user.uid), formDataCopy)

			navigate('/')
		} catch (err) {
			toast.error('Something went wrong with registration')
		}
	}

	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>
				<form onSubmit={onSubmit}>
					<input
						type="text"
						id="name"
						placeholder="Name"
						value={name}
						className="nameInput"
						onChange={onChange}
					/>
					<input
						type="email"
						id="email"
						placeholder="Email"
						value={email}
						className="emailInput"
						onChange={onChange}
					/>

					<div className="passwordInputDiv">
						<input
							type={showPassword ? 'text' : 'password'}
							className="passwordInput"
							placeholder="Password"
							id="password"
							value={password}
							onChange={onChange}
						/>

						<img
							src={visibilityIcon}
							alt="Show password"
							className="showPassword"
							onClick={() =>
								setShowPassword((prevState) => !prevState)
							}
						/>
					</div>

					<Link to="/forgot-password" className="forgotPasswordLink">
						ForgotPassword
					</Link>

					<Link to="/sign-in" className="registerLink">
						Sign in instead
					</Link>

					<div className="signUpBar">
						<p className="signUpText">Sign up</p>
						<button className="signUpButton">
							<ArrowRightIcon
								fill="#fff"
								width="2.2rem"
								height="2.2rem"
							/>
						</button>
					</div>
				</form>

				<OAuth />
			</div>
		</>
	)
}

export default SignUp
