import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase-config';

const TransactionList = () => {

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

        const total = transactions.reduce((acc, transaction) => {
            if ( transaction.type === "income" ) {
                acc.income += Number(transaction.sum);
            } else {
                acc.expense += Number(transaction.sum);
            }
            return acc;
        }, {income: 0, expense: 0})

  return (
    
    <div>
        <h2>Transactions list</h2>
        
        <p><strong>Total income:</strong>{total.income} lv</p>
        <p><strong>Total expense:</strong>{total.expense} lv</p>

        <h3><strong>Balance:</strong>{total.income - total.expense} lv</h3>
        
    </div>
  )
}

export default TransactionList;