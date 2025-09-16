import { useState } from "react";
import "../css/sign_up.css";

import emailIcon from "../assets/email.svg";

function SignUp() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState(false);

    const handleSignUp=()=>{
        console.log('Sign up attempted with:', { email, password });
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                <div className="signup-header">
                    <div className="signup-logo">
                        <div className="signup-logo-icon">
                            <img src={emailIcon} alt="logo" />
                        </div>
                        <span className="signup-logo-text">EchoMailer</span>
                    </div>
                </div>
                <div className="signup-welcome">
                    <h1 className="signup-title">Join Us!</h1>
                    <p className="signup-subtitle">Create your EchoMailer account</p>
                </div>
                <div className="signup-form">
                    <div className="signup-group">
                        <label className="signup-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="signup-input-email"
                            placeholder="Your email address"
                        />
                    </div>
                    <div className="signup-group">
                        <div className="signup-password-header">
                            <label className="signup-label">Password</label>
                        </div>
                        <div className="signup-password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="signup-input-password"
                                placeholder="Your password"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="signup-toggle"
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>
                    <button onClick={handleSignUp} className="signup-button">Sign Up</button>
                    <div className="signup-footer">
                        <span className="signup-footer-text">Already a User?</span>
                        <a href="#" className="signup-login-link">Log In</a>
                    </div>
                </div>
            </div>

            <div className="signup-right">
                <div className="signup-blob-outer">
                    <div className="signup-blob-inner">
                        <div className="signup-blob"></div>
                    </div>
                </div>
                <div className="signup-trusted">
                    <h2 className="signup-trusted-title">Trusted by All</h2>
                    <p className="signup-trusted-subtitle">
                        Join the growing community of businesses using EchoMailer to connect with their audience.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
