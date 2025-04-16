import { get, set, ref, query, equalTo, orderByChild, update } from "firebase/database";
import { db } from "../config/firebase-config";
import { addDoc, collection } from "firebase/firestore";


export const getUserByHandle = async (handle) => {
    const useRef = ref(db,`users/${handle}`);
    
    return get(useRef).then((snapshot) => {
        return snapshot.val();
    });
};

export const getUserByHandleSnapshot = (handle) => {
    const useRef = ref(db, `users/${handle}`);

    return get(useRef);

};

export const createUserHandle = async (firstName, lastName, username, uid, email, phoneNumber) => {
    
    return await set(ref(db, `users/${username}`), {
        firstName,
    lastName,
    username,
    uid,
    email,
    phoneNumber,
    avatarUrl: "https://thumbs.dreamstime.com/b/green-money-cash-bag-wealth-dollar-sign-rich-finance-logo-343919921.jpg",
    })
};

export const getUserData = (uid) => {
    return get(query(ref(db, `users`), orderByChild('uid'), equalTo(uid)));
}

export const updateUser = async (username, userData) => {
    const userRef = ref(db, `users/${username}`);
    await update(userRef, userData);
};

