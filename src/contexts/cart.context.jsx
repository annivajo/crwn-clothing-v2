import {createContext, useReducer} from "react";
import {createAction} from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen : () => {},
    cartItems: [],
    addItemToCart:  ()=> {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem=> cartItem.id !== existingCartItem.id)
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CART_ACTION_TYPES = {
   SET_CART_ITEMS: 'SET_CART_ITEMS',
   SET_CART_OPEN: 'SET_CART_OPEN'
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_CART_OPEN:
            return {
               ...state,
               isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);
    //
    // useEffect(() => {
    //     const newCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    //     setCartCount(newCount);
    // }, [cartItems]);
    //
    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce(
    //         (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    const [state, dispatch] = useReducer(cartReducer,INITIAL_STATE);
    const {cartItems, isCartOpen, cartCount, cartTotal } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS,
            {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCount}
        ))
    }

    const addItemToCart = (productToAdd) => {
        // setCartItems(addCartItem(cartItems, productToAdd));
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCard = (productToRemove) => {
        // setCartItems(removeCartItem(cartItems, productToRemove))
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        // setCartItems(clearCartItem(cartItems, cartItemToClear));
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCard,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}