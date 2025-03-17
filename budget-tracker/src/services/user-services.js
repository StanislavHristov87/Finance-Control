import { get, set, ref, query, equalTo, orderByChild, update } from "firebase/database";
import { db } from "../config/firebase-config";

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
    avatarUrl: "https://www.pngall.com/wp-content/uploads/15/King-Julien.png",
    })
};

export const getUserData = (uid) => {
    return get(query(ref(db, `users`), orderByChild('uid'), equalTo(uid)));
}