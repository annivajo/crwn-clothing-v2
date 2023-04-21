import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import {createUserDocumentFromAuth, onAuthStateChangedLister, getCurrentUser} from "./utils/firebase.utils";
import {setCurrentUser, checkUserSession} from "./store/user/user.action";
import {useDispatch} from "react-redux";
import {useEffect} from "react";


const App = () => {
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     console.log("USE EFFECT APP");
    //     const unsubscribe = onAuthStateChangedLister((user)=>{
    //         console.log("USER:", user);
    //         if(user){
    //             createUserDocumentFromAuth(user);      
    //         }
    //         dispatch(setCurrentUser(user));

    //     });
    //     return unsubscribe;
    // },[])

    // useEffect(()=> {
    //     getCurrentUser().then((user)=> console.log(user));
    // },[])

     useEffect(()=> {
        dispatch(checkUserSession());
    },[])

  return (
    <Routes>
        <Route path='/' element={<Navigation/>}>
            <Route index element={<Home/>}/>
            <Route path='auth' element={<Authentication/>}/>
            <Route path = 'shop/*' element={<Shop/>}/>
            <Route path = 'checkout' element={<Checkout/>}/>
        </Route>
    </Routes>
  );
};

export default App;
