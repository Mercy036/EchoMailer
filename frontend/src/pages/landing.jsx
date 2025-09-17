import React from "react";
import "../css/landing.css";
import { useNavigate } from "react-router-dom";
function Landing() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <>
      <div className="auth-buttons">
        <button 
          className="auth-btn login-btn" 
          onClick={handleLogin}
        >
          Log In
        </button>
        <button 
          className="auth-btn signup-btn" 
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>

      <div className="landing-container">
        <h1 className="landing-text echo">ECHO</h1>
        <h1 className="landing-text mailer">MAILER</h1>
      </div>
    </>
  );
}

export default Landing;