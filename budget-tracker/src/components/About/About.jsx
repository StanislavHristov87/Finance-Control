import React from 'react'
import './About.css'

const About = () => {
  return (
    <div>
      <img style={{width: "350px", 
        height: "350px",
         borderRadius: "8px",
         marginTop: "10px"
         }} src="https://cdn.pixabay.com/photo/2023/09/14/10/27/face-logo-8252748_640.png" alt="" />
        <h1 className='about'>
            This is app for people who are not good in saving money !
            <br />
            It helps you to make your daily expenses and check in advance what you can save .
        </h1>
    </div>
  )
}

export default About