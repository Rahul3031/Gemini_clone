import React, { useState } from 'react';
import { Container,Card, Form, Button, Alert} from 'react-bootstrap';
import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link} from 'react-router-dom';

const ForgetPassword = () => {

    const emailRef = useRef();
    const {resetpassword} = useAuth();
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");
    const [loading,setLoading] = useState(false);
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
    
        try {
          setError('');
          setLoading(true);
          setMessage('');
          await resetpassword(emailRef.current.value);
          setMessage("Check your mailbox for further actions.");
          console.log("reset password successful!");
        } catch (error) {
          console.error("reset password failed:", error);
          setError('Failed to reset password');
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
                <h2 className='text-center mb-4'>Password Reset</h2>
                {error && <Alert variant='danger'>{error}</Alert>}\
                {message && <Alert variant='success'>{message}</Alert>}
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
                    <Button onClick={handleSubmit} disabled={loading} className='w-100 mt-4' type='submit'>Reset Password</Button>
                </Form>
                <div className='w-100 text-center mt-2'> 
                    <Link to="/Gemini_clone/login">Log In?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'> 
            Need an Account? <Link to="/Gemini_clone/signup">Sign Up</Link>
        </div>
      </div>
    </Container> 
    </>
  )
}

export default  ForgetPassword;