import { useState } from 'react'

import { Link } from 'react-router-dom'

import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

import { toast } from 'react-toastify'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')

	const onChange = (e) => {
		setEmail(e.target.value)
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		try {
			const auth = getAuth()
			await sendPasswordResetEmail(auth, email)
			toast.success('Reset email sent')
		} catch (err) {
			console.log(err)
			toast.error('Could not send reset email')
		}
	}

	return (
		<div className="pageContainer">
			<header>
				<p className="pageHeader">Forgot password</p>
			</header>

			<main>
				<form onSubmit={onSubmit}>
					<input
						type="email"
						className="emailInput"
						placeholder="Email"
						id="email"
						value={email}
						onChange={onChange}
					/>
					<Link className="forgotPasswordLink" to="/sign-in">
						Sign in
					</Link>

					<div className="signInBar">
						<div className="signInText">Send Reset Link</div>
						<button className="signInButton">
							<ArrowRightIcon
								fill="#fff"
								width="2.25rem"
								height="2.25rem"
							/>
						</button>
					</div>
				</form>
			</main>
		</div>
	)
}

export default ForgotPassword
