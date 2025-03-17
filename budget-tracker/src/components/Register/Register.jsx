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

    const register = async () => {
        if (form.firstName.length < 4 || form.firstName.length > 12) {
            setError("First name must be unique and have between 4 and 12 symbols!");
            return;
        }

        if (form.lastName.length < 5 || form.lastName.length < 12) {
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

        if (form.password) {
            setError("Password is required!");
            return;
        }

        try {
            const user = await getUserByHandleSnapshot(user.handle); // user sevrisec.js napishi go

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

            setContext({user, userData: null });
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
        <label>First Name:</label>
        <input type="text" value={form.firstName} onChange={updateForm("firstName")} />
      </div>

      <div>
        <label>Last Name:</label>
        <input type="text" value={form.lastName} onChange={updateForm("lastName")} />
      </div>

      <div>
        <label>User Name:</label>
        <input type="text" value={form.handle} onChange={updateForm("handle")} />
      </div>

      <div>
        <label>Email</label>
        <input type="text" value={form.email} onChange={updateForm("email")} />
      </div>

      <div>
        <label>Phone Number</label>
        <input type="text" value={form.phoneNumber} onChange={updateForm("phoneNumber")} />
      </div>

      <div>
        <label>Password</label>
        <input type="text" value={form.password} onChange={updateForm("password")} />
      </div>

      <button type="submit">Register</button>

    </form>
  )
}

export default Register;