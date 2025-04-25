import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase-config';

function Home() {

  const { user } = useContext(AppContext);

  const [firebaseUser ,loading, error] = useAuthState(auth);

  if (loading) {
    return <h1 style={{color: "green"}} >Loading...</h1>
  }

  return (
    <div>

      {firebaseUser ? (
        <>
        <img style={{marginTop: "28px", borderRadius: "8px"}} src="https://www.teenproblem.net/media/teenproblem/files/articles/576x371/fd8555362997acb4647869782d443928.jpg"
          alt="Uncle Skruch" />

        <h1 style={{color: "black"}} >I hope you are enjoying my app!</h1>
      </>
      ) : (

        <div>
        <h1 style={{color: "red"}} >Welcome to my app for having your smart budget !</h1>

    
        <p style={{fontSize: "33px", color: "green"}} > Log in to your account
          <br />
          <Link style={{color: "white"}} to="/signin">Sign in</Link></p>
          </div>
      )}
     
    </div>
  )
}

export default Home;