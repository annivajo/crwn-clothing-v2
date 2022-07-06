import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {useEffect} from "@types/react";
import {createUserDocumentFromAuth, onAuthStateChangedLister} from "./utils/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";


const App = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedLister((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe;
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
