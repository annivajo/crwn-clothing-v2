import {createContext, useState, useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedLister, signOutUser} from "../utils/firebase.utils";

export const UserContext = createContext({
    currentUser : null,
    setCurrentUser: () =>null,
});

export const UserProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};



    useEffect(()=>{
        console.log("USE EFFECT USER PROVIDER");
        const unsubscribe = onAuthStateChangedLister((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

