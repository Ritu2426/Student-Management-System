import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddStudent() {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailIdError, setEmailIdError] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [mobileNoError, setMobileNoError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('x-auth-token');

    const headers = {
        "x-auth-token" : `${token}`,
        "Content-Type": "application/json",
    };

    function handleNameChange(event) {
        const value = event.target.value;
        setName(value);

        if (value.trim() === '') {
            setNameError('Name should not be empty');
        } else {
            setNameError('');
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

    function handleMobileNoChange(event) {
        const value = event.target.value;

        if (/^\d{10}$/.test(value)) {
            setMobileNo(value);
            setMobileNoError('');
        } else {
            setMobileNo('');
            setMobileNoError('Please enter a valid 10-digit mobile number');
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        if(nameError || emailIdError || mobileNoError) {
            toast.error("Please provide proper input.");
            return;
        }

        axios.post("http://localhost:8080/addStudent", {name, emailId, mobileNo}, {headers: headers})
            .then(res => {
                toast.success('Student created successfully.')
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                toast.error('Something went wrong')
            });
    }

    return(
        <>
            <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
                <div className="w-50 bg-white rounded p-3">
                    <form onSubmit={handleSubmit}>
                        <h2>Add Student</h2>
                        <div className="mb-2">
                            <label>Name:</label>
                            <input type="text" placeholder="Enter Name" className={`form-control ${nameError ? 'is-invalid' : ''}`} 
                                onChange={handleNameChange} required />
                            {nameError.trim() !== '' && <div className="invalid-feedback">{nameError}</div>}
                        </div>
                        <div className="mb-2">
                            <label>Email Id:</label>
                            <input type="text" placeholder="Enter Email Id" className={`form-control ${emailIdError ? 'is-invalid' : ''}`} 
                                onChange={handleEmailIdChange} required />
                            {emailIdError && <div className="invalid-feedback">{emailIdError}</div>}
                        </div>
                        <div className="mb-2">
                            <label>Mobile No:</label>
                            <input type="text" placeholder="Enter Mobile No" className={`form-control ${mobileNoError ? 'is-invalid' : ''}`} 
                                onChange={handleMobileNoChange} required />
                            {mobileNoError && <div className="invalid-feedback">{mobileNoError}</div>}
                        </div>
                        <button className="btn btn-secondary" onClick={() => {navigate('/');}}>Back</button>
                        <button type='submit' className="btn btn-success mx-1">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddStudent;