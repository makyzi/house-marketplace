import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyC2NMR8J1aj3REcubfht4GaYwrJ-3w-kw8',
	authDomain: 'house-marketplace-app-eb398.firebaseapp.com',
	projectId: 'house-marketplace-app-eb398',
	storageBucket: 'house-marketplace-app-eb398.appspot.com',
	messagingSenderId: '357097075686',
	appId: '1:357097075686:web:631130a15c55f6904c1c27',
}

initializeApp(firebaseConfig)

export const db = getFirestore()
