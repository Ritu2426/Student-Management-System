import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setStudents } from "../redux/actions/studentActions"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function StudentManagement() {

    const students = useSelector((state) => state.allStudents.students);
    const dispatch = useDispatch();

    const token = localStorage.getItem('x-auth-token');

    const headers = {
        "x-auth-token" : `${token}`,
        "Content-Type": "application/json",
    };

    const [search, setSearch] = useState('');

    const fetchStudents = async () => {
        await axios
            .get("http://localhost:8080/", {headers: headers})
            .then(res => {
                dispatch(setStudents(res.data));
            })
            .catch(err => {
                console.log(err)
                if(err.response.data.message){
                    toast.error(err.response.data.message)
                }
            });
            
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    async function deleteStudent(id) {
        await axios
            .delete("http://localhost:8080/deleteStudent/"  + id, {headers: headers})
            .then(res => {
                toast.success(res.data.message);
            })
            .catch(err => {
                console.log(err)
                if(err.response.data.message){
                    toast.error(err.response.data.message)
                }
            });

        fetchStudents();

    };

    function handleDeleteStudent(id) {
        if (window.confirm('Do you want to remove?')) {
            deleteStudent(id);
        }
    }

    return(
        <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h4 className="p-1">Student List</h4>
                <div className="row mb-4">
                    <div className="col">
                        <input type="text" placeholder="Search" className="form-control" 
                            style={{ width: '400px', padding: '8px' , height : '40px' }} 
                            onChange={(e) => setSearch(e.target.value)} value={search} />
                    </div>
                    <div className="col-auto">
                        <Link to="/addStudent" className="btn btn-success btn-block" 
                            style={{ height : '40px' }} >Create +</Link>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email ID</th>
                            <th>Mobile No</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students
                                .filter((student) => {
                                    return search.toLowerCase() === '' 
                                        ? student
                                        : student.name.toLowerCase().includes(search)
                                            || student.emailId.toLowerCase().includes(search)
                                            || student.mobileNo.toLowerCase().includes(search);
                                })
                                .map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.id ?? ''}</td>
                                        <td>{student.name ?? ''}</td>
                                        <td>{student.emailId ?? ''}</td>
                                        <td>{student.mobileNo ?? ''}</td>
                                        <td>
                                            <Link to={`readStudent/${student.id}`} className="btn btn-info">Read</Link>
                                            <Link to={`updateStudent/${student.id}`} className="btn btn-primary mx-1">Edit</Link>
                                            <button className="btn btn-danger" onClick={() => {handleDeleteStudent(student.id)}}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default StudentManagement;