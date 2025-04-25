import React from 'react'
import { AppContext } from '../../context/AppContext';
import { useContext, useState } from 'react';
import { getDownloadURL, ref as storageRef, uploadBytes} from "firebase/storage";
import { storage } from '../../config/firebase-config';
import { updateUser } from '../../services/user-services';
import { useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


 const Profile = () => {

    const {user, userData, setContext} = useContext(AppContext);
    const [showAlert, setShowAlert] = useState(false);

    const [form, setForm] = useState({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        phoneNumber: userData?.phoneNumber || "",
    });

    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    // useEffect
    useEffect(() => {
        if (userData) {
            console.log(userData);
            
            setForm({
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
            });
        }
    }, [userData]);
    


    const updateForm = (prop) => (e) => {
        setForm({...form, [prop]: e.target.value });
    };

    const submit = async (event) => {
        event.preventDefault();

        if (form.firstName.length < 4 || form.firstName.length > 32) {
            alert("First name must be between 4 and 32 characters.");
            return;
        }
    
        if (form.lastName.length < 4 || form.lastName.length > 32) {
            alert("Last name must be between 4 and 32 characters.");
            return;
        }
    
        if (form.phoneNumber.length < 9) {
            alert("Incorrect phone number format.");
            return;
        }

        const updateUserData = { ...userData, ...form };

        if (file) {
            try {
                let avatarUrl = userData.avatarUrl;

                if (file) {
                    const storageReference = storageRef(storage, `avatars/${userData.uid}`);
                        await uploadBytes(storageReference, file);
                        avatarUrl = await getDownloadURL(storageReference);
                };

                updateUserData['avatarUrl'] = avatarUrl;
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        };

        updateUser(userData.username, updateUserData);
        setContext({ user, userData: updateUserData });
        setShowAlert(true);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // const handleLogout = () => {
    //     const auth = getAuth();
    //     signOut(auth)
    //       .then(() => {
    //         navigate("/signin"); // Пренасочване към страницата за вход
    //       })
    //       .catch((error) => {
    //         console.error("Error signing out:", error);
    //       });
    //   };

     
    const handleLogout = async () => {
        try {
            const auth = getAuth();
    
            if (!auth.currentUser) {
                console.warn("Потребителят не е влязъл.");
                return;
            }
    
            await signOut(auth);
    
            // Изчистване на контекста след излизане
            setContext({ user: null, userData: null });
    
            navigate("/signin");
        } catch (error) {
            console.error("Грешка при logout:", error);
        }
    };
    

    const handleNavigate = () => {
        navigate("/transactions")
      }

  return (
    <form onSubmit={submit} className="profile-form">

<div>
    <label
    style={{
        fontSize: "53px",
         textAlign: "center",
        marginLeft: "50px",
        color: "black"
        
        }}
    >Profile</label>
    {userData?.avatarUrl ? (
        <img src={userData.avatarUrl} alt="Avatar" width="100" height="100" style={{ 
            borderRadius: "50%",
            marginLeft: "50px",
            marginTop: "38px"
        
        }} />
    ) : (
        <p>No profile picture</p>
    )}
</div>


      <div>
        <label style={{color: "black", fontSize: "25px"}} >First Name:</label>
        <input 
        type="text" 
        value={form.firstName} 
        onChange={updateForm("firstName")} 
        required
        style={{color: "white",
            fontSize: "18px",
             borderRadius: "18px", 
             marginLeft: "20px",
            marginTop: "53px"
            }}
        />
      </div>

      <div>
        <label style={{color: "black", fontSize: "25px"}} >Last Name:</label>
        <input 
        type="text" 
        value={form.lastName} 
        onChange={updateForm("lastName")} 
        required 
        style={{color: "white",
            fontSize: "18px",
             borderRadius: "18px", 
             marginLeft: "20px",
            marginTop: "11px"
            }}
        />
      </div>

      <div>
        <label style={{color: "black", fontSize: "25px"}} >Phone Number:</label>
        <input 
        type="text" 
        value={form.phoneNumber} 
        onChange={updateForm("phoneNumber")} 
        required 
        style={{color: "white",
             fontSize: "18px",
              borderRadius: "18px", 
              marginLeft: "20px",
               marginTop: "11px"
            }}
        />
      </div>

      <div>
        <label style={{color: "black", marginLeft: "93px", fontSize: "25px"}} >Profile Picture :</label>
        <input 
        type="file" 
        onChange={handleFileChange} 
        style={{color: "white",
            fontSize: "18px",
             borderRadius: "18px", 
             marginLeft: "20px",
            marginTop: "11px"
            }}
        />
      </div>

      <button type="submit" 
      style={{
        marginTop: "100px",
         marginRight: "50px",
          fontSize: "18px"}}
          >save</button>
      <button 
      type="button" 
      onClick={handleLogout}
      style={{
        marginTop: "100px",
         marginRight: "50px",
          fontSize: "18px"}}
      
      >logout</button>

      <button type="button" onClick={handleNavigate} >new transactions</button>


      {showAlert && <p>Profile updated successfully!</p>}
    </form>
  )
}

export default Profile;