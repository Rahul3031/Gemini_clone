import React, { useState } from 'react';
import {Container, Card, Form, Button, Alert} from 'react-bootstrap';
import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link,Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef= useRef();
    const {signup} = useAuth();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match");
        }
    
        try {
          setError('');
          setLoading(true);
          await signup(emailRef.current.value, passwordRef.current.value);
          navigate('/Gemini_clone/');
          console.log("Signup successful!");
        } catch (error) {
          console.error("Signup failed:", error);
          setError('Failed to create an account');
        }
        setLoading(false);
      };


  return (
    <>
    <Container className='d-flex align-items-center justify-content-center'
      style={{minHeight: "100vh"}}
      >
      <div className='w-100' style={{maxWidth: "400px"}}>
      <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password-Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required/>
                    </Form.Group>
                    <Button onClick={handleSubmit} disabled={loading} className='w-100 mt-4' type='submit'>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'> 
            Already have an account? <Link to="/Gemini_clone/login">Log In</Link>
        </div>
      </div>
    </Container> 
    </>
  )
}

export default Signup;




