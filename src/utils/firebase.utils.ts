import {initializeApp} from "firebase/app";
import { Category } from "../store/categories/category.types";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    User,
    onAuthStateChanged,
    UserCredential,
    NextOrObserver
} from 'firebase/auth';
import {doc, getDoc, getFirestore, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot} from 'firebase/firestore';
import { StringLiteral } from "typescript";

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

export type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocuments = async<T extends ObjectToAdd> (collectionKey: string, objectsToAdd: T[]) : Promise<void>=> {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async (): Promise<Category[]>=> {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const result: Category[] = querySnapshot.docs.map(docSnapshot =>docSnapshot.data() as Category);
    return result;
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    //     const {title, items} = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {})
    //return categoryMap;
}

export type AdditionalInfo = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email:string;
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInfo?: AdditionalInfo): Promise<void | QueryDocumentSnapshot<UserData>> => {
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

    return userShapshot as QueryDocumentSnapshot<UserData>;

}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string):  Promise<UserCredential | void>  => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string ): Promise<UserCredential | void>  => {
    console.log("inside signInAuthUserWithEmailAndPassword");
    console.log("email:", email);
    console.log("password:", password);
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser =()=> signOut(auth);

export const onAuthStateChangedLister = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
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