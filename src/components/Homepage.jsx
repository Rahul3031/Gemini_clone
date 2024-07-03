import React, { useState } from 'react'
import {Container, Alert, Card,Button} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom'; 

const Homepage = () => {

    const [error,setError] = useState('');
    const {currentUser,logout} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (evt) =>{
        evt.preventDefault();
        try{
            setError('');
            await logout();
            console.log("logout succesful");
            navigate('/Gemini_clone/login');
        }
        catch(err){
            console.log("logout unsuccesful:", err);
            setError("Failed to Log Out");
        }
    }

    const handle = () =>{
        navigate('/Gemini_clone/update-profile');
    }

    const handleback = () =>{
        navigate('/Gemini_clone/');
    }

  return (
    <>
    <Container className='d-flex align-items-center justify-content-center'
    style={{minHeight: "100vh"}}
    >
    <div className='w-100' style={{maxWidth: "400px"}}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Profile</h2>
                {error && <Alert variant='danger' >{error}</Alert>}
                <strong>Email:</strong> {currentUser.email}
                {/* <Link  className='btn btn-primary w-100 mt-3' path='/Gemini_clone/signup' >Update Profile</Link> */}
                <div className='w-100 text-center mt-2' >
                    <Button className='btn btn-primary w-100 mt-3' onClick={handle} >Update Profile</Button>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2' >
        <Button variant='link' onClick={handleback} >Back to Homepage</Button>
        </div>
        <div className='w-100 text-center ' >
        <Button variant='link' onClick={handleSubmit} >Log Out</Button>
        </div>
    </div>
    </Container> 
    </>
  )
}

export default Homepage