import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAiPL2H2Hd1VpQ5DgZHeXxpYa94jxFyOjs",
  authDomain: "moving-contract-app.firebaseapp.com",
  projectId: "moving-contract-app",
  storageBucket: "moving-contract-app.firebasestorage.app",
  messagingSenderId: "578177021565",
  appId: "1:578177021565:web:b41bd594653a812413a314"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)