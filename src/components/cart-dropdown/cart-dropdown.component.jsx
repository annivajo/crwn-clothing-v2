import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from 'react-router-dom';
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import { useSelector, useDispatch } from "react-redux";
import {selectCartItems} from '../../store/cart/cart.selector';
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartDropdown = ()=> {
    const cartItems = useSelector(selectCartItems);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkOut = () => {
        navigate('/checkout');
        dispatch(setIsCartOpen(false));
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={checkOut}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;