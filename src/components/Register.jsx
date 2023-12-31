import "./Register.css"
import { useState, useEffect } from "react";

import axios from "axios";


function Register() {

    //const navigate = useNavigate();
    

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (data.password === data.confirmPassword) {
                const response = axios.post("http://localhost:5000/data", data);
               
            } else {
                setErrorMessage("Passwords did not match!");
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return <div className="container">
        <div className="img-container">
            <img className="img" src="https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""></img>
        </div>
        <div className="form-container">
            <h1 className="main-heading">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <span className="item-heading">Name:</span>
                    <input className="input-box" type="text" placeholder="Enter name" name="name" onChange={handleChange} required />
                </div>
                <div className="form-item">
                    <span className="item-heading">Email:</span>
                    <input className="input-box" type="email" placeholder="Enter mail" name="email" onChange={handleChange} required />
                </div>
                <div className="form-item">
                    <span className="item-heading">Phone:</span>
                    <input className="input-box" type="tel" placeholder="Enter phone number" name="phone" onChange={handleChange} required />
                </div>
                <div className="form-item">
                    <span className="item-heading">Password:</span>
                    <input className="input-box" type="password" placeholder="Enter password" name="password" onChange={handleChange} required />
                </div>
                <div className="form-item">
                    <span className="item-heading">confirm Password:</span>
                    <input className="input-box" type="password" placeholder="Enter confirm password" name="confirmPassword" onChange={handleChange} required />
                </div>
                <div className="checkbox-item">
                    <input type="checkbox" required></input>
                    <span>I agree to all terms and conditions </span>
                    <a className="term-link" href="/">Term and conditions</a>
                </div>
                <div className="links-container">
                    <a className="link" href="/">Already have account?</a>
                </div>
                {errorMessage !== null && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <div className="btn-container">
                    <input className="submit-btn" type="submit"></input>
                </div>
            </form>
        </div>
    </div>
}

export default Register;