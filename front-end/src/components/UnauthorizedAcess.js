import React from 'react';
import { useNavigate } from "react-router-dom";

const UnauthorizedAccess = () => {

  const navigate = useNavigate();

  return (
    <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h4 className="p-1">Unauthorized Access</h4>
        <p>You are not authorized to view this page.</p>
        <button onClick={() => {navigate('/login');}}> Login </button>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
