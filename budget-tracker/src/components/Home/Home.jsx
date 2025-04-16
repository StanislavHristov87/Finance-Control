import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1 style={{color: "red"}} >Welcome to my app for having your smart budget !</h1>

    
    <p style={{fontSize: "33px", color: "green"}} > Log in to your account
      <br />
      <Link style={{color: "white"}} to="/signin">Sign in</Link></p>
    <footer style={{fontSize: "23px", marginTop: "158px", color: "black"}} >Stanley Budget Tracker ®</footer>
    </div>
  )
}

export default Home