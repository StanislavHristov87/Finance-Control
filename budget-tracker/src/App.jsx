

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register/Register'
import SignIn from './components/SignIn/SignIn'
import { AppContext } from './context/AppContext'
import { useState,useEffect, useContext } from 'react'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import { getUserData } from './services/user-services'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './config/firebase-config';
import AddTransaction from './components/addTransaction/addTransaction'
import TransactionList from './components/TransactionList/TransactionList'
import { onValue, ref } from 'firebase/database'
import FilteredTransactions from './components/FilteredTransactions/FilteredTransactions'
import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Footer from './components/Footer/Footer'


function App() {

  const [context, setContext] = useState({
    user: null,
    userData: null,
  });

  const [transaction, setTransaction] = useState({
    sum: '',
    type: 'income',
    category: 'salary',
    info: '',
    date: ''
});


const [transactions, setTransactions] = useState([]);

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


        useEffect(() => {
          
          
          if (!user) return; // Изчакай потребителя
          const transactionsRef = ref(db, `users/${user.uid}/transactions`);

            const unsubscribe = onValue(transactionsRef, (snapshot) => {

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const transactionArray = Object.values(data);
                    
                    setTransactions(transactionArray);

                } else {
                    setTransactions([]);
                }
            });
            return () => unsubscribe();
        }, [user]);
  
  



  return (
    
    <BrowserRouter>
        <AppContext.Provider value={{...context, setContext }} >
        {context.user && <Navbar />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/register' element={< Register />} />
                <Route path='/signin' element={< SignIn />} />
                <Route path='/profile' element={< Profile />} />
                <Route path='/transactions' element={<AddTransaction transaction={transaction} setTransaction={setTransaction} />} />
                <Route path='/transactionsList' element={<TransactionList transactions={transactions} />} />
                <Route path='/filteredTransactions' element={<FilteredTransactions transactions={transactions} />} />
            </Routes>
            <Footer />
        </AppContext.Provider>
    </BrowserRouter>

  )
}

export default App;
