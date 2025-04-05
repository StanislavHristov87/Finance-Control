

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
import { auth, db } from './config/firebase-config';
import AddTransaction from './components/addTransaction/addTransaction'
import TransactionList from './components/TransactionList/TransactionList'
import { onValue, ref } from 'firebase/database'
import FilteredTransactions from './components/FilteredTransactions/FilteredTransactions'

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

        useEffect(() => {

            const transactionsRef = ref( db, "transactions" );

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
        }, []);
  
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
                <Route path='/transactions' element={<AddTransaction transaction={transaction} setTransaction={setTransaction} />} />
                <Route path='/transactionsList' element={<TransactionList transactions={transactions} />} />
                <Route path='/filteredTransactions' element={<FilteredTransactions transactions={transactions} />} />
            </Routes>
        </AppContext.Provider>
    </BrowserRouter>

  )
}

export default App;
