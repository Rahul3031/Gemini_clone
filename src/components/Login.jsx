import React, { useState } from 'react';
import { Container,Card, Form, Button, Alert} from 'react-bootstrap';
import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link,Navigate, useNavigate } from 'react-router-dom';

const LogIn = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate =useNavigate();
    

    const handleSubmit = async (evt) => {
        evt.preventDefault();
    
        try {
          setError('');
          setLoading(true);
          await login(emailRef.current.value, passwordRef.current.value);
          navigate('/Gemini_clone/');
          console.log("Signin successful!");
        } catch (error) {
          console.error("Signin failed:", error);
          setError('Failed to login');
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
                <h2 className='text-center mb-4'>Sign In</h2>
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
                    <Button onClick={handleSubmit} disabled={loading} className='w-100 mt-4' type='submit'>Sign In</Button>
                </Form>
                <div className='w-100 text-center mt-2'> 
                    <Link to="/Gemini_clone/reset-password">Forget Password?</Link>
                </div>
            </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'> 
               Create an Account? <Link to="/Gemini_clone/signup">Sign Up</Link>
            </div> 
         </div>
         </Container>
    </>
  )
}

export default  LogIn;
