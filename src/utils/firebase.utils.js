import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, Firestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDCdMj3rdLdUdvq66MKg9cYQpLU_t0hPGs",
    authDomain: "crwn-db-4148f.firebaseapp.com",
    databaseURL: "https://crwn-db-4148f.firebaseio.com",
    projectId: "crwn-db-4148f",
    storageBucket: "crwn-db-4148f.appspot.com",
    messagingSenderId: "1048806325535",
    appId: "1:1048806325535:web:7b661ec11987907c91c42a",
    measurementId: "G-WH1ZPC0W3V"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    console.log("userAith:",userAuth)
   const userDocRef = doc(db, 'users', userAuth.uid);
   const userShapshot = await getDoc(userDocRef);

   if(!userShapshot.exists()){
       const {displayName, email} = userAuth;
       const createdAt = new Date();

       try {
           await setDoc(userDocRef, {displayName, email, createdAt})
       } catch (error) {
           console.log("createUserDocumentFromAuth error:", error);
       }
   }

   return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;
        return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);

}


