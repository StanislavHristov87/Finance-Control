

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register/Register'
import SignIn from './components/SignIn/SignIn'
import { AppContext } from './context/AppContext'
import { useState } from 'react'
import Home from './components/Home/Home'


function App() {

  const [context, setContext] = useState({
    user: null,
    userData: null,
  })


  return (
    
    <BrowserRouter>
        <AppContext.Provider value={{...context, setContext }} >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={< Register />} />
                <Route path='/signin' element={< SignIn />} />
            </Routes>
        </AppContext.Provider>
    </BrowserRouter>

  )
}

export default App;
