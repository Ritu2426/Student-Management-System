import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [emailId, setEmailId] = useState('');
    const [emailIdError, setEmailIdError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

    function handleLogin(event) {
        event.preventDefault();

        axios.post("http://localhost:8080/login", {emailId, password})
            .then(res => {
                console.log(res)
                
                toast.success(res.data.message)

                const token = res.data.token;

                window.localStorage.setItem("x-auth-token", token);
                window.dispatchEvent(new Event('authChanged'));

                const decodedToken = jwtDecode(token);
                
                const userName = decodedToken.userName;

                window.localStorage.setItem("userName", userName);

                navigate('/');

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
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
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
                        <button type="submit" className="btn btn-success w-100">Login</button>
                        <p>If you are new here please do signup.</p>
                        <Link to="/signup" className="btn btn-default border bg-light w-100">Sign Up</Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;