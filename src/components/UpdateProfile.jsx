import React, { useState } from 'react';
import {Container, Card, Form, Button, Alert} from 'react-bootstrap';
import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link,useNavigate } from 'react-router-dom';

const updateprofile = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef= useRef();
    const {currentUser,updatemail,updatepassword} = useAuth();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match");
        }

        // Firebase authentication methods like updatePassword return promises,
        //  which resolve asynchronously.
        //  Using .then().catch() allows you to chain operations and handle errors appropriately after the promise resolves or rejects.

        const promises = [];
        setLoading(true);
        setError('');
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updatemail(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            promises.push(updatepassword(passwordRef.current.value));
        }

        Promise.all(promises).then(()=>{
            console.log("profile updated");
            navigate('/Gemini_clone/');
        })
        .catch((error)=>{
            console.log("profile not updated:",error);
            setError('Failed to update account');
        })
        .finally(()=>{
            setLoading(false);
        })
      };


  return (
    <>
    <Container className='d-flex align-items-center justify-content-center'
        style={{minHeight: "100vh"}}
        >
        <div className='w-100' style={{maxWidth: "400px"}}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Update Profile</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef}  placeholder='Leave blank to keep the same'/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password-Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef}  placeholder='Leave blank to keep the same'/>
                    </Form.Group>
                    <Button onClick={handleSubmit} disabled={loading} className='w-100 mt-4' type='submit'>Update Profile</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'> 
            <Link to="/Gemini_clone/">cancel</Link>
        </div>
        </div>
    </Container> 
    </>
  )
}

export default updateprofile;