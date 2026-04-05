import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ReadStudent() {
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

    const fetchStudent = async () => {
        await axios
            .get("http://localhost:8080/" + id, {headers: headers})
            .then(res => {
                setStudent(res.data[0]);
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

    return(
        <>
            <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
                <div className="w-50 bg-white rounded p-3">
                    <h4 className="p-1">Student Details</h4>
                    <form>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{student?.name ?? ''}</td>
                                </tr>
                                <tr>
                                    <td>Email Id</td>
                                    <td>{student?.emailId ?? ''}</td>
                                </tr>
                                <tr>
                                    <td>Mobile No</td>
                                    <td>{student?.mobileNo ?? ''}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-secondary" onClick={() => {navigate('/');}}>Back</button>
                        <button className="btn btn-success mx-1" onClick={() => {navigate(`/updateStudent/${id}`);}}>Edit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ReadStudent;