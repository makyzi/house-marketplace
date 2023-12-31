import { useState } from 'react'

import { toast } from 'react-toastify'

import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import OAuth from '../components/OAuth'

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

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

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)

			if (userCredential.user) {
				navigate('/')
			}
		} catch (err) {
			toast.error('Bad user credentials')
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
					<Link to="/sign-up" className="registerLink">
						Sign up instead
					</Link>

					<div className="signInBar">
						<p className="signInText">Sign in</p>
						<button className="signInButton">
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

export default SignIn
