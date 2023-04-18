import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {doc, getDoc, getFirestore, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map(docSnapshot =>docSnapshot.data());
    return result;
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    //     const {title, items} = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {})
    //return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    console.log("createUserDocumentFromAuth:", userAuth);
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userShapshot = await getDoc(userDocRef);
    if (!userShapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInfo})
        } catch (error) {
            console.log("createUserDocumentFromAuth error:", error);
        }
    }

    return userShapshot;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    console.log("inside signInAuthUserWithEmailAndPassword");
    console.log("email:", email);
    console.log("password:", password);
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser =()=> signOut(auth);

export const onAuthStateChangedLister = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
            )
    })
}