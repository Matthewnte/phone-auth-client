// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import config, { FirebaseConfig } from './config'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: config.firebase.apiKey!,
  authDomain: config.firebase.authDomain!,
  projectId: config.firebase.projectId!,
  storageBucket: config.firebase.storageBucket!,
  messagingSenderId: config.firebase.messagingSenderId!,
  appId: config.firebase.appId!,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export default app
