import {createAction, withMatcher, Action, ActionWithPayload} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import { CategoryItem } from "../categories/category.types";


export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;


export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems : CartItem[] ,productToAdd: CategoryItem) => { 
    const newCartItems = addCartItem(cartItems, productToAdd); 
    return setCartItems(newCartItems);
};

export const removeItemFromCard = (cartItems : CartItem[], productToRemove: CategoryItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove); 
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems  : CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
};

const addCartItem = (cartItems: CartItem[] , productToAdd: CategoryItem) : CartItem[] => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], productToRemove: CategoryItem) : CartItem[] => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    if (existingCartItem?.quantity === 1) {
        return cartItems.filter(cartItem=> cartItem.id !== existingCartItem.id)
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) : CartItem[] =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
