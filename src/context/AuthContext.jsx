import React, { createContext, useContext, useState, useEffect } from 'react';
import {auth} from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail,updateEmail,updatePassword } from 'firebase/auth';
const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [currentUser,SetCurrentUser] = useState(null); 
    const [loading,SetLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (User) => {
          SetCurrentUser(User);
          SetLoading(false);
        });
    
        return () => unsubscribe();
        //return unsubscribe means we have to clean the data so that there is no leakage
      }, []);  //[] empty dependency means it will run single time after rendering

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
    
      const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
      };

      const logout = () =>{
        return signOut(auth);
      }

      const resetpassword = (email) =>{
        return sendPasswordResetEmail(auth,email);
      }

      const updatemail = (email) =>{
        return updateEmail(currentUser,email);
      }
      const updatepassword = (password) =>{
        return updatePassword(currentUser,password);
      }
 
   const value = { 
    currentUser,
    signup,
    login,
    logout,
    resetpassword,
    updatemail,
    updatepassword  
   }


  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext);
  };



