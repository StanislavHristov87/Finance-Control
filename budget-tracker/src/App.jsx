

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register/Register'
import SignIn from './components/SignIn/SignIn'
import { AppContext } from './context/AppContext'
import { useState,useEffect } from 'react'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import { getUserData } from './services/user-services'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import AddTransaction from './components/addTransaction/addTransaction'
import TransactionList from './components/TransactionList/TransactionList'
import Statistic from './components/Statistic/Statistic'

function App() {

  const [context, setContext] = useState({
    user: null,
    userData: null,
  });
  
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!loading && user) {
      getUserData(user.uid)
        .then(snapshot => {
          if (snapshot.exists()) {
            setContext({ user, userData: snapshot.val()[Object.keys(snapshot.val())[0]] });
          }
        })
    }
  }, [user, loading]);


  return (
    
    <BrowserRouter>
        <AppContext.Provider value={{...context, setContext }} >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={< Register />} />
                <Route path='/signin' element={< SignIn />} />
                <Route path='/profile' element={< Profile />} />
                <Route path='/transactions' element={<AddTransaction />} />
                <Route path='/transactionsList' element={<TransactionList />} />
                <Route path='/statistics' element={<Statistic />} />
            </Routes>
        </AppContext.Provider>
    </BrowserRouter>

  )
}

export default App;
