import React from "react";
import profile from "../images/LogoAnimated.gif";
import "../css/Navbar.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const user = localStorage.getItem('userName');

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('x-auth-token');
        window.dispatchEvent(new Event('authChanged'));
        toast.success('Logout Successfully.');
        navigate('/login');
    };

    return(
        <>
            <div className = "navbar">
                <div className = "navbar-left">
                    <h2 className = "p-2">Student Management</h2>
                </div>
                <div className = "navbar-right">
                    {user && (
                        <div className = "user-info">
                            <img
                                className = "user-thumbnail"
                                src = {profile}
                                alt = "User"
                            />
                            <span className = "username">Welcome, {user}</span>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    )} 
                </div>
            </div>
        </>
    );
}

export default Header;