// sidebar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/sidebar.css";
import dashboardIcon from "../assets/bar-graph-statistics-svgrepo-com.svg";
import emailOpenIcon from "../assets/email-1-svgrepo-com.svg";
import composeIcon from "../assets/paper-airplane-svgrepo-com.svg";

function Sidebar() {
    const navigate = useNavigate();
    const pageLocation = useLocation();

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedName = localStorage.getItem("name");
        const storedPic = localStorage.getItem("profilePic");

        if (storedEmail) setUserEmail(storedEmail);
        if (storedName) setUserName(storedName);

        if (storedPic) {
            setProfilePic(storedPic);
        } else if (storedName) {
            setProfilePic(`https://ui-avatars.com/api/?name=${encodeURIComponent(storedName)}&background=e91e63&color=fff`);
        } else if (storedEmail) {
            setProfilePic(`https://ui-avatars.com/api/?name=${encodeURIComponent(storedEmail)}&background=e91e63&color=fff`);
        } else {
            setProfilePic("https://i.pravatar.cc/150?u=default"); // final fallback
        }
    }, []);



    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        navigate("/signup");
    };

    return (
        <div className="sidebar">
            <div className="nav-section">
                <div
                    className={`dashboard ${pageLocation.pathname === "/dashboard" ? "active" : ""}`}
                    onClick={() => navigate("/dashboard")}
                >
                    <img src={dashboardIcon} alt="dashboard" />
                    Dashboard
                </div>

                <div
                    className={`email ${pageLocation.pathname === "/emails" ? "active" : ""}`}
                    onClick={() => navigate("/emails")}
                >
                    <img src={emailOpenIcon} alt="email" />
                    Email
                </div>

                <div
                    className={`compose ${pageLocation.pathname === "/compose" ? "active" : ""}`}
                    onClick={() => navigate("/compose")}
                >
                    <img src={composeIcon} alt="compose" />
                    Compose
                </div>
            </div>

            <hr />

            <div className="profile-section">
                <div className="profile-picture">
                {profilePic ? (
                    <img src={profilePic} alt="profile" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
                ) : (
                    userName ? userName.charAt(0).toUpperCase() : "?"
                )}
                </div>

                <div className="profile-name">{userName || "User"}</div>
                <div className="profile-email">{userEmail || "Not logged in"}</div>
                <div className="logout-button">
                    <button onClick={handleLogout}>Sign Out</button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
