import "./Login.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
import Cookies from 'js-cookie';

var isLoggedIn = false;

function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = data;
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var foundItems = null;
    try {
      const userData = await fetch("http://localhost:5000/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!userData.ok) {
        throw new Error("Network response was not ok");
      }
      const userJsonData = await userData.json();
      for (let i = 0; i < userJsonData.length; i++) {
        if (userJsonData[i].email === data.username[0]) {
          foundItems = userJsonData[i];
        }
      }

      if (foundItems != null) {
        if (foundItems.password === md5(data.password[0])) {
          Cookies.set('userid', foundItems.email);
          navigate("/")
        }
        else {
          setErrorMessage("Password incorrect");
        }
      }
      else {
        setErrorMessage("User not found");
      }

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return <div className="container">
    <div className="img-container">
      <img className="img" src="https://images.unsplash.com/photo-1625242661157-e9e5708ffe5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt=""></img>
    </div>
    <div className="form-container">
      <h1 className="main-heading">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <span className="item-heading">Username:</span>
          <input className="input-box" type="text" placeholder="Enter username" name="username" onChange={handleChange} required />
        </div>
        <div className="form-item">
          <span className="item-heading">Password:</span>
          <input className="input-box" type="password" placeholder="Enter password" name="password" onChange={handleChange} required />
        </div>
        <div className="checkbox-item">
          <input type="checkbox" required></input>
          <span>I agree to all terms and conditions </span>
          <a className="term-link" href="/">Term and conditions</a>
        </div>
        <div className="links-container">
          <a className="link" href="/">forget password</a>
          <a className="link" href="/register">Don't have account</a>
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

export default Login;
export {isLoggedIn};