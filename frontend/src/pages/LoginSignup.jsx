import React, { useState } from 'react';
import './CSS/loginsignup.css';

export default function LoginSignup() {
  const [state, setState] = useState("Login");
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const toggleState = () => {
    setState(state === "Login" ? "Sign Up" : "Login");
  };

  // Functions for login and signup which link to the backend
  const login = async () => {
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((data) => responseData = data);
    
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((data) => responseData = data);
    
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignupcontainer'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === "Sign Up" && (
            <input
              type='text'
              placeholder='Your Name'
              name='username'
              value={formdata.username}
              onChange={changeHandler}
            />
          )}
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={formdata.email}
            onChange={changeHandler}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formdata.password}
            onChange={changeHandler}
          />
        </div>
        <button
          className='button'
          onClick={() => { state === "Login" ? login() : signup() }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className='loginsignup-login'>
            Already have an account?
            <span
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={toggleState}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className='loginsignup-login'>
            Create an account?
            <span
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={toggleState}
            >
              Click Here
            </span>
          </p>
        )}
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}
