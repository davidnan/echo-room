import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="login-container">
            <div className="header">
                <h2>Echo room</h2>
                <p>Welcome back</p>
            </div>
            <div className="tabs">
                <button className={!isSignUp ? 'active' : ''} onClick={() => setIsSignUp(false)}>Sign in</button>
                <button className={isSignUp ? 'active' : ''} onClick={() => setIsSignUp(true)}>Sign up</button>
            </div>
            {isSignUp ? (
                <>
                    <div className="input-group">
                        <label htmlFor="username">Username input</label>
                        <input type="text" id="username" placeholder="Enter your username" />
                    </div>
                     <div className="input-group">
                        <label htmlFor="email">Email input</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password input</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>
                </>
            ) : (
                <>
                  <div className="input-group">
                        <label htmlFor="email">Email input</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password input</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <a className="forgot-password" href="#">Forgot password?</a>

                </>
            )}
            <button className="continue-btn">Continue</button>
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