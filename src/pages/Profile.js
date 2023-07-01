import { useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'

import { getAuth, updateProfile } from 'firebase/auth'

import { updateDoc, doc } from 'firebase/firestore'

import { db } from '../firebase.config'

import { toast } from 'react-toastify'

import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

const Profile = () => {
	const auth = getAuth()

	const [changeDetails, setChangeDetails] = useState(false)

	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	})

	const { name, email } = formData

	const navigate = useNavigate()

	const onLogout = () => {
		auth.signOut()
		navigate('/')
	}

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// Update display name in firebase
				await updateProfile(auth.currentUser, {
					displayName: name,
				})

				// Update in firestore
				const userRef = doc(db, 'users', auth.currentUser.uid)
				await updateDoc(userRef, {
					name,
				})

				toast.success(`Name changed to ${name}`)
			}
		} catch (err) {
			toast.error('Could not update profile details')
		}
	}

	const onChange = (e) => {
		setFormData((prevState) => {
			return {
				...prevState,
				[e.target.id]: e.target.value,
			}
		})
	}

	return (
		<div className="profile">
			<header className="profileHeader">
				<p className="pageHeader">My Profile</p>
				<button onClick={onLogout} type="button" className="logOut">
					Logout
				</button>
			</header>

			<main>
				<div className="profileDetailsHeader">
					<p className="profileDetailsText">Personal details</p>
					<p
						className="changePersonalDetails"
						onClick={() => {
							changeDetails && onSubmit()
							setChangeDetails((prevState) => !prevState)
						}}
					>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>
				<div className="profileCard">
					<form>
						<input
							type="text"
							id="name"
							className={
								!changeDetails
									? 'profileName'
									: 'profileNameActive'
							}
							disabled={!changeDetails}
							value={name}
							onChange={onChange}
						/>
						<input
							type="email"
							id="email"
							className={
								!changeDetails
									? 'profileEmail'
									: 'profileEmailActive'
							}
							disabled={!changeDetails}
							value={email}
							onChange={onChange}
						/>
					</form>
				</div>

				<Link to="/create-listing" className="createListing">
					<img src={homeIcon} alt="House icon" />
					<p>Sell or rent your property</p>
					<img src={arrowRight} alt="Arrow right" />
				</Link>
			</main>
		</div>
	)
}

export default Profile
