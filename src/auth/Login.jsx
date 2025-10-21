import React, { useState } from 'react';
import './Login.css';
import { signInWithGooglePopup } from "./firebaseLogin.js";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from 'react-google-button';
import Logo from '../util/Logo.jsx';

function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    let navigate = useNavigate();

    return (
        <div className="container1">
            <div className="login-container">
                <div className="logo">
                    <Logo />
                    <h2 className="logo-text">EchoRoom</h2>
                </div>
                <div className="welcome-text">Ready to set the vibe?</div>
                <div className="subtitle-text">Sign in to add music to a room.</div>
                <div className="google-btn-wrapper">
                    <GoogleButton onClick={() => {
                        const user = signInWithGooglePopup();
                        console.log(user);
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Login;
