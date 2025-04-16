import { db } from '../config/firebase-config';
import { push, ref, set, get } from 'firebase/database';
import { AppContext } from '../context/AppContext';

export const addTransaction = async (uid, transaction) => {
    try {
        const transactionRef = push(ref(db, `users/${uid}/transactions`));
        await set(transactionRef, transaction);
        console.log('Transaction added sucefully!');
        
    } catch (error) {
        console.error('Error adding transaction:', error);
        
    }
}


export const fetchTransactions = async (uid) => {
  const snapshot = await get(ref(db, `transactions/${uid}`));
  if (snapshot.exists()) {
    const data = snapshot.val();
    const transactionsArray = Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
    }));
    return transactionsArray;
  } else {
    return [];
  }
};
