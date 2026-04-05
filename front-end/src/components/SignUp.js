import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailIdError, setEmailIdError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    function handleUserNameChange(event) {
        const value = event.target.value;
        setUserName(value);

        if (value.trim() === '') {
            setUserNameError('Username should not be empty');
        } else {
            setUserNameError('');
        }
    }

    function handleEmailIdChange(event) {
        const value = event.target.value;

        if (/^\S+@\S+\.\S+$/.test(value)) {
            setEmailId(value);
            setEmailIdError('');
        } else {
            setEmailId('');
            setEmailIdError('Please enter a valid email');
        }
    }

    function handlePasswordChange(event) {
        const value = event.target.value;
        setPassword(value);

        if (value.trim() === '') {
            setPasswordError('Password should not be empty');
        } else {
            setPasswordError('');
        }
    }

    function handleSignUp(event) {
        event.preventDefault();

        axios.post("http://localhost:8080/signup", {userName, emailId, password})
            .then(res => {
                console.log(res)
                toast.success(res.data.message)
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
                toast.error(err.response.data.message)
            });
    }

    return(
        <>
            <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
                <div className="w-25 bg-white rounded p-3">
                    <form onSubmit={handleSignUp}>
                        <h2>Signup</h2>
                        <div className="mb-3">
                            <label>Username</label>
                            <input type="text" placeholder="Enter Username" 
                                className={`form-control ${userNameError ? 'is-invalid' : ''} rounded-0`} 
                                onChange={handleUserNameChange} required />
                            {userNameError.trim() !== '' && <div className="invalid-feedback">{userNameError}</div>}
                        </div>
                        <div className="mb-3">
                            <label>Email Id</label>
                            <input type="text" placeholder="Enter Email Id" 
                                className={`form-control ${emailIdError ? 'is-invalid' : ''} rounded-0`}
                                onChange={handleEmailIdChange} required />
                            {emailIdError && <div className="invalid-feedback">{emailIdError}</div>}
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" placeholder="Enter Password" 
                                className={`form-control ${passwordError ? 'is-invalid' : ''} rounded-0`}
                                onChange={handlePasswordChange} required />
                            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                        </div>
                        <button type="submit" className="btn btn-success w-100">Sign Up</button>
                        <p>If you already signup please do login.</p>
                        <Link to="/login" className="btn btn-default border bg-light w-100">Login</Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;