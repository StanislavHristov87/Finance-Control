import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>Welcome to my app for having your smart budget !

    <h3>Sign In</h3>
    <p> Having allready account <Link to="/signin">Sign in</Link></p>
    </div>
  )
}

export default Home