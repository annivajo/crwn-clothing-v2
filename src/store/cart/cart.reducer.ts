import { CartItem } from "./cart.types";
import {AnyAction} from 'redux';
import { setIsCartOpen, setCartItems } from './cart.action';

export type CartState = {
    readonly isCartOpen: Boolean;
    readonly cartItems: CartItem[];
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: []
}


export const cartReducer = (state = INITIAL_STATE, action: AnyAction): CartState => {
   
    if (setIsCartOpen.match(action)) {
        return {
          ...state,
          isCartOpen: action.payload,
        };
      }
    
      if (setCartItems.match(action)) {
        return {
          ...state,
          cartItems: action.payload,
        };
      }
    
      return state;
}