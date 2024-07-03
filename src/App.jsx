import React from 'react'
import SideBar from './components/SideBar/SideBar'
import Main from './components/Main/Main';
import DashBoard from './components/DashBoard';
import Signup from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
import PrivateRoute from './components/PrivateRoute';
import ForgetPassword from './components/ForgetPassword';
import UpdateProfile from './components/UpdateProfile';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
const App = () => {
  return (
    <>  
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/Gemini_clone/' element={
            <PrivateRoute>
              <DashBoard/>
            </PrivateRoute>
          }/>
          <Route path='/Gemini_clone/update-profile' element={
            <PrivateRoute>
              <UpdateProfile/>
            </PrivateRoute>
          }/>
          <Route path='/Gemini_clone/homepage' element={<Homepage/>} />
          <Route path='/Gemini_clone/login' element={<Login/>} />
          <Route path='/Gemini_clone/signup' element={<Signup/>} />
          <Route path='/Gemini_clone/reset-password' element={<ForgetPassword/>} />
        </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
