import React, { useState } from 'react';
import './Login.css';
import { login, createAccount } from "./firebaseLogin.js";
import { useNavigate } from "react-router-dom";
import {handleFirebaseErrorCodes} from "./firebaseErrorCodes.js";

function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const isFormValid = isSignUp
        ? username && email && password
        : email && password;

    const handleContinue = async (e) => {
        if (isSignUp) {
            await handleSignUp(e);
        } else {
            await handleLogin(e)
        }
    };


    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
            const user = await createAccount(username, email, password);
            navigate("/");
            console.log("Logged in as:", user.displayName);
        }
        catch(err){
            console.log(err);
            setError(err);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            setError(null);
            navigate("/");
            console.log("Logged in as:", user.displayName);
        } catch (err) {
            console.log(err.code);
            setError(err);
        }
    };

    return (
        <div className="login-container">
            
            <div className="tabs">
                <button className={!isSignUp ? 'active' : ''} onClick={() => setIsSignUp(false)}>Sign in</button>
                <button className={isSignUp ? 'active' : ''} onClick={() => setIsSignUp(true)}>Sign up</button>
            </div>
            <div className="form-container">
                <div className="input-group">
                    {isSignUp && (
                        <>
                            <label htmlFor="username">Username input</label>
                            <input
                                type="text"
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username" />
                        </>
                    )}
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email input</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password input</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                {!isSignUp && (
                    <a className="forgot-password" href="#">
                        Forgot password?
                    </a>
                )}
            </div>
            <button className="continue-btn" disabled={!isFormValid} onClick={handleContinue}>Continue</button>
            {error && <p style={{ color: "red" }}>{handleFirebaseErrorCodes(error.code)}</p>}
            <div className="separator">Or continue with</div>
            <div className="social-buttons">
                <button>  </button>
                <button>  </button>
                <button>  </button>
            </div>
        </div>
    );
}

export default Login;