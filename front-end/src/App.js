import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/ReactToastify.css';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StudentManagement from './components/StudentManagement';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import ReadStudent from './components/ReadStudent';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UnauthorizedAccess from './components/UnauthorizedAcess';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('x-auth-token')));

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('x-auth-token')));
    };

    window.addEventListener('storage', syncAuthState);
    window.addEventListener('authChanged', syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('authChanged', syncAuthState);
    };
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          {isLoggedIn ? 
            (
              <>
                <Route path='/' element={<StudentManagement />} />
                <Route path='/addStudent' element={<AddStudent />} />
                <Route path='/readStudent/:id' element={<ReadStudent />} />
                <Route path='/updateStudent/:id' element={<UpdateStudent />} />
              </>
            ) : 
              <Route path='*' element={<UnauthorizedAccess />} />
          }
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
