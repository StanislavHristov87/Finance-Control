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
        <h1 style={{color: "blue"}} >Welcome to my app for having your smart budget !</h1>
        <img style={{width: "400px", height: "400px", borderRadius: "28px"}} src="https://static.vecteezy.com/system/resources/previews/045/999/477/non_2x/trendy-savings-concepts-vector.jpg" alt="image" />

    
        <p style={{fontSize: "33px", color: "black"}} > Log in to your account :
          <br />
          <br />
          <Link style={{color: "blue"}} to="/signin">Click me for sign in</Link></p>
          </div>
      )}
     
    </div>
  )
}

export default Home;