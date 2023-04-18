import { useState} from "react";
import {useDispatch} from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import './sign-in-form.styles.scss';
import {goodleSignInStart, emailSignInStart} from '../../store/user/user.action';

const defaultFormFields = {
    email: '',
    password : ''
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const dispatch = useDispatch();

   

    const signInWithGoogle = async()=> {
       // await signInWithGooglePopup();
       dispatch(goodleSignInStart());
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log("handleSubmit SIGN IN")

        try {
            //await signInAuthUserWithEmailAndPassword(email, password);
            dispatch(emailSignInStart(email, password));

            resetFormFields();
        } catch(error){
            switch (error.code){
                case 'auth/wrong-password':
                    alert ("wrong password");
                    break;
                case 'auth/user-not-found':
                    alert ("user does not exist")
                    break;
                default:
                    console.log("error when SIGN IN: ",error)
            }

        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log("name:", name);
        console.log("value:", value);

        setFormFields({...formFields, [name]: value })
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span> Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="text"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit" >Sign In</Button>
                    <Button type='button'
                            buttonType={BUTTON_TYPE_CLASSES.google}
                            onClick={signInWithGoogle}>Google Sign In</Button>
                </div>

            </form>

        </div>
    )
}

export default SignInForm;