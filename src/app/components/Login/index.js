'use client';
import './index.css'
import { useState } from 'react'
const Login = () => {
    const errorMessages = {
        userName: {
            required: 'Required!'
        },
        password: {
            required: 'Required!'
        }
    }
    const [userName, setUserName] = useState({ value: null, error: false, message: null })
    const [password, setPassword] = useState({ value: null, error: false, message: null })

    const handleChange = (e, id) => {
        const value = e.target.value;
        console.log("Handle change called : ", id, value);
        if (value) {
            switch(id) {
                case 'userName':
                    setUserName((prevState) => ({...prevState, value}));
                    break;
                case 'password':
                    setPassword((prevState) => ({...prevState, value}));
                    break;
            }
        }
        handleErrors({field: {id, value}})
    }

    const handleErrors = ({focus, field = {}}) => {
        let focusFieldId = null;
        let hasError = false;
        const { id, value } = field;

        if (id) {
            const state = {}
            switch(id) {
                case 'userName':
                    state.error = !Boolean(value);
                    state.message = value ? null : errorMessages.userName.required;
                    console.log("User name state : ", state);
                    setUserName((prevState) => ({...prevState, ...state}));
                    break;
                case 'password':
                    state.error = !Boolean(value);
                    state.message = value ? null : errorMessages.password.required;
                    setPassword((prevState) => ({...prevState, ...state}));
                    console.log("Password state : ", state);
                    break;
            }
        } else {
            if (!userName?.value) {
                setUserName((prevState) => ({...prevState, error: true, message: errorMessages.userName.required}));
                focusFieldId = 'userName'
                hasError = true
            }
            if (!password.value) {
                setPassword((prevState) => ({...prevState, error: true, message: errorMessages.password.required}));
                if (!focusFieldId) {
                    focusFieldId = 'password'
                }
                hasError = true
            }
        }


        if (focus) {
            const focusEle = document.querySelector(`#${focusFieldId}`);
    
            if (focusEle) {
                focusEle.focus();
            }
        }
        
        return hasError
    }

    const handleLogin = () => {
        console.log("Final: ");
        const hasError = handleErrors({focus: true});
        if (!hasError) {
            console.log(`Handling login for creds: ${userName.value}/${password.value}`);
        }
    }

    return (
        <div>
            <div className='login-box'>
                <div className='login-field-section'>
                    <label name="userName">
                        <input type="text" id="userName" className='login-input' placeholder='User name' onInput={(e) => handleChange(e, 'userName')} required></input>
                    </label> <br />
                    {
                        (userName.error && userName.message) && <span className='error-message'>{userName.message}</span>
                    }
                    
                </div>

                <div className='login-field-section'>
                    <label name="password">
                        <input type="password" id="password" className='login-input' placeholder='Password' required onInput={(e) => handleChange(e, 'password')}></input>
                    </label> <br />
                    {
                        (password.error && password.message) && <span className='error-message'>{password.message}</span>
                    }
                </div>
                <button className='login-button' 
                    onClick={handleLogin}    
                >
                    Login
                </button>
            </div>

        </div>
    )
}

export default Login;