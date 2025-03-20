import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from '../../context/AppContext';
import { loginUser } from '../../services/auth-service';
import { getUserData } from '../../services/user-services';

const SignIn = () => {

    const {user, setContext} = useContext(AppContext);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    


    const navigate = useNavigate();
    const location = useLocation();

    const updateForm = (prop) => (e) => {
        setForm({ ...form, [prop]: e.target.value });
    };

    useEffect(() => {
        if (user) {
            navigate(location.state?.from.pathname || "/profile");
        }
    }, [location.state?.from.pathname, navigate, user]);

    const login = async (event) => {
        event.preventDefault();
        try {
            const credentials = await loginUser(form.email, form.password);
            const snapshot = await getUserData(credentials.user.uid);
            const userData = snapshot.val()[Object.keys(snapshot.val())[0]];
            setContext({user: credentials.user, userData: userData})
            console.log("User Data before navigate:");
            navigate("/profile");

        } catch (error) {
            setError("Invalid email or password");
            console.log(error);
        }
    }

    

  return (
    <form onSubmit={login}>
        <h2>Sign In</h2>
     <div>
        <label>Email:</label>
        <input type="text" value={form.email} onChange={updateForm("email")} />
     </div>

     <div>
        <label>Password:</label>
        <input type="text" value={form.password} onChange={updateForm("password")} />
     </div>

     <button type="submit">Sign In</button>

     <p>Don't have an account? <Link to="/register">Register here</Link></p>
     {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
    </form>
    
  )
}

export default SignIn;