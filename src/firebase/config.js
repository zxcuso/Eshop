
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAuBaFes_OuOPneUmOZk8oLPGPMZfrKUAI",
  authDomain: "eshop-63433.firebaseapp.com",
  projectId: "eshop-63433",
  storageBucket: "eshop-63433.appspot.com",
  messagingSenderId: "904286789254",
  appId: "1:904286789254:web:1be989c7050215e0a9bb07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app