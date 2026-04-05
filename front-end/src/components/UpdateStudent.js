import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateStudent() {
    const navigate = useNavigate();
    const {id} = useParams();

    const token = localStorage.getItem('x-auth-token');

    const headers = {
        "x-auth-token" : `${token}`,
        "Content-Type": "application/json",
    };
    
    const [student, setStudent] = useState({
        id : '',
        name : '',
        emailId : '',
        mobileNo : ''
    });
    const [tempStudent, setTempStudent] = useState({
        id : '',
        name : '',
        emailId : '',
        mobileNo : ''
    });
    
    const [nameError, setNameError] = useState('');
    const [emailIdError, setEmailIdError] = useState('');
    const [mobileNoError, setMobileNoError] = useState('');

    const fetchStudent = async () => {
        await axios
            .get("http://localhost:8080/" + id, {headers: headers})
            .then(res => {
                setStudent(res.data[0]);
                setTempStudent(res.data[0]);
            })
            .catch(err => {
                console.log(err)
                if(err.response.data.message){
                    toast.error(err.response.data.message)
                }
            });

    };

    useEffect(() => {
        fetchStudent();
    }, []);

    function handleNameChange(event) {
        const value = event.target.value;

        setStudent(prevUserData => ({
            ...prevUserData,
            name : value
        }));

        if (value.trim() === '') {
            setNameError('Name should not be empty');
        } else {
            setNameError('');
        }

    }

    function handleEmailIdChange(event) {
        const value = event.target.value;

        if (/^\S+@\S+\.\S+$/.test(value)) {
            setStudent(prevUserData => ({
                ...prevUserData,
                emailId : value
            }));
            setEmailIdError('');
        } else {
            setStudent(prevUserData => ({
                ...prevUserData,
                emailId : value
            }));
            setEmailIdError('Please enter a valid email');
        }
    }

    function handleMobileNoChange(event) {
        const value = event.target.value;

        if (/^\d{10}$/.test(value)) {
            setStudent(prevUserData => ({
                ...prevUserData,
                mobileNo : value
            }));
            setMobileNoError('');
        } else {
            setStudent(prevUserData => ({
                ...prevUserData,
                mobileNo : value
            }));
            setMobileNoError('Please enter a 10-digit mobile number');
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const {id, name, emailId, mobileNo } = student;

        if(tempStudent?.name == name && tempStudent?.emailId == emailId 
            && tempStudent?.mobileNo == mobileNo) 
        {
            toast.error('Please Update');
        } 
        else {
            axios.put("http://localhost:8080/updateStudent/" + id, {name, emailId, mobileNo}, {headers: headers})
                .then(res => {
                    console.log(res.data);
                    toast.success(res.data.message);
                    navigate('/');
                })
                .catch(err => console.log(err));
        } 
    }

    return(
        <>
            <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
                <div className="w-50 bg-white rounded p-3">
                    <form onSubmit={handleSubmit}>
                        <h2>Update Student</h2>
                        <div className="mb-2">
                            <label>Name:</label>
                            <input type="text" placeholder="Enter Name" className={`form-control ${nameError ? 'is-invalid' : ''}`} 
                                onChange={handleNameChange} required value={student?.name ?? ''}/>
                            {nameError.trim() !== '' && <div className="invalid-feedback">{nameError}</div>}
                        </div>
                        <div className="mb-2">
                            <label>Email Id:</label>
                            <input type="text" placeholder="Enter Email Id" className={`form-control ${emailIdError ? 'is-invalid' : ''}`} 
                                onChange={handleEmailIdChange} required value={student?.emailId ?? ''}/>
                            {emailIdError && <div className="invalid-feedback">{emailIdError}</div>}
                        </div>
                        <div className="mb-2">
                            <label>Mobile No:</label>
                            <input type="text" placeholder="Enter Mobile No" className={`form-control ${mobileNoError ? 'is-invalid' : ''}`} 
                                onChange={handleMobileNoChange} required value={student?.mobileNo?? ''}/>
                            {mobileNoError && <div className="invalid-feedback">{mobileNoError}</div>}
                        </div>
                        <button className="btn btn-secondary" onClick={() => {navigate('/');}}>Back</button>
                        <button type='submit' className="btn btn-success mx-1">Update</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateStudent;