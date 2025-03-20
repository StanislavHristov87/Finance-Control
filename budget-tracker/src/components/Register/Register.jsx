import  {React, useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { registerUser } from '../../services/auth-service';
import { createUserHandle, getUserByHandleSnapshot } from '../../services/user-services';
import { useNavigate } from "react-router-dom";


 const Register = () => {
    const {setContext} = useContext(AppContext);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        handle: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const updateForm = (prop) => (e) => {
        setForm({...form, [prop]: e.target.value });
        setError("");
    };

    const register = async (event) => {

        event.preventDefault(); // Спира презареждането на страницата
        setError(""); // Изчиства предишните грешки

        if (form.firstName.length < 4 || form.firstName.length > 12) {
            setError("First name must be unique and have between 4 and 12 symbols!");
            return;
        }

        if (form.lastName.length < 4 || form.lastName.length > 12) {
            setError("Family name must be unique and have between 4 and 12 symbols!")
            return;
        }

        if (!form.handle) {
            setError("User name is required!");
            return;
        }

        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        const isValid = isValidEmail(form.email);

        if (!isValid) {
            setError("Invalid email!");
            return;
        }

        if (!form.password) {
            setError("Password is required!");
            return;
        }

        try {
            const user = await getUserByHandleSnapshot(form.handle); // user sevrisec.js napishi go

            if (user.exists()) {
                console.log(user.val());
                return console.log(`
                    User name @${form.handle} all ready exist!
                    `);
            }

            const credentials = await registerUser(form.email, form.password);
            await createUserHandle(
                form.firstName,
                form.lastName,
                form.handle,
                credentials.user.uid,
                form.email,
                form.phoneNumber
            );

            const newUserData = {
                firstName: form.firstName,
                lastName: form.lastName,
                handle: form.handle,
                email: form.email,
                phoneNumber: form.phoneNumber,
                uid: credentials.user.uid,
            };
        
            // Задаваме `userData` правилно
            setContext({ user: credentials.user, userData: newUserData });

            navigate("/profile");
        } catch (error) {
            setError(error.message);
        }
    };

  return (
    
    <form onSubmit={register}>
        <h2>Register</h2>

        {error &&  <p style={{ color: "red" }} >{error}</p>}

        <div>
        <label htmlFor="firstName" >First Name:</label>
        <input type="text" value={form.firstName} id="firstName" autoComplete="given-name" onChange={updateForm("firstName")} />
      </div>

      <div>
        <label htmlFor="lastName" >Last Name:</label>
        <input type="text" value={form.lastName} id="lastName" autoComplete="family-name" onChange={updateForm("lastName")} />
      </div>

      <div>
        <label htmlFor="username" >User Name:</label>
        <input type="text" value={form.handle} id="username" autoComplete="username" onChange={updateForm("handle")} />
      </div>

      <div>
        <label htmlFor="email" >Email</label>
        <input type="text" value={form.email} id="email" autoComplete="email" onChange={updateForm("email")} />
      </div>

      <div>
        <label htmlFor="phoneNumber" >Phone Number</label>
        <input type="text" value={form.phoneNumber} id="phoneNumber" autoComplete="tel" onChange={updateForm("phoneNumber")} />
      </div>

      <div>
        <label htmlFor="password" >Password</label>
        <input type="text" value={form.password} id="password" autoComplete="new-password" onChange={updateForm("password")} />
      </div>

      <button type="submit">Register</button>

    </form>
  )
}

export default Register;