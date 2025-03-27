import { db } from '../config/firebase-config';
import { push, ref, set } from 'firebase/database';

export const addTransaction = async (transaction) => {
    try {
        const transactionRef = push(ref(db, 'transactions'));
        await set(transactionRef, transaction);
        console.log('Transaction added succsesfully!');
        
    } catch (error) {
        console.error('Error adding transaction:', error);
        
    }
}