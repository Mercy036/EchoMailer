import { useState } from "react";
import "../css/sign_in.css";

import emailIcon from "../assets/email.svg";
import googleIcon from "../assets/icons8-google.svg";

function SignIn() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState(false);
    const handleSignIn=()=>{
        console.log('Sign in attempted with:', { email, password });
    };
    const handleGoogleSignIn=()=>{
        console.log('Google sign in clicked');
    };
    return (        <div className="sign-in-container">
            <div className="left-section">
                <div className="header">
                    <div className="logo">
                        <div className="logo-icon">
                            <img src={emailIcon} alt="logo" />
                        </div>
                        <span className="logo-text">EchoMailer</span>
                    </div>
                </div>
                <div className="welcome-section">
                    <h1 className="welcome-title">Welcome!</h1>
                    <p className="welcome-subtitle">Log in to EchoMailer</p>
                </div>

                <div className="oauth-buttons">
                    <button onClick={handleGoogleSignIn} className="oauth-button">
                        <img src={googleIcon} alt="Google logo" className="oauth-icon" />
                        Log in with Google
                    </button>
                </div>
                <div className="divider">
                    <span className="divider-text">OR</span>
                </div>
                <div className="form-section">
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input-email"
                            placeholder="Your email address"
                        />
                    </div>
                    <div className="form-group">
                        <div className="password-header">
                            <label className="form-label">Password</label>
                            <a href="#" className="forgot-password">Forgot password?</a>
                        </div>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input-password"
                                placeholder="Your password"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>
                    <button onClick={handleSignIn} className="login-button">Log in</button>
                    <div className="sign-up-section">
                        <span className="sign-up-text">Don't have an account? </span>
                        <a href="#" className="sign-up-link">Sign up</a>
                    </div>
                </div>
            </div>

            <div className="right-section">
                <div className="blob-outer-container">
                    <div className="blob-inner-container">
                        <div className="blob"> 
                        </div>
                    </div>
                </div>
                <div className="trusted-section">
                    <h2 className="trusted-title">Trusted by All</h2>
                    <p className="trusted-subtitle">
                        Join the growing community of businesses using EchoMailer to connect with their audience.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default SignIn;