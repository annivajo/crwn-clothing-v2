import {Fragment, useContext} from 'react';
import {Outlet, Link} from "react-router-dom";
import {ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {signOutUser} from "../../utils/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";
import {NavigationContainer, LogoContainer, NavLinks, NavLink} from "./navigation.styles";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
   // const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    const signOutHandler = async() => {
        await signOutUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo'/>
                </LogoContainer>

                <NavLinks>
                  <NavLink to='/shop'>SHOP</NavLink>

                  {
                    currentUser?
                        <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
                        :
                        <NavLink to='/auth'>SIGN IN</NavLink>
                  }

                  <CartIcon/>
                </NavLinks>
                { isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;