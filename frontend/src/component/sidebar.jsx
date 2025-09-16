import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/sidebar.css";
import dashboardIcon from "../assets/bar-graph-statistics-svgrepo-com.svg";
import emailOpenIcon from "../assets/email-1-svgrepo-com.svg";
import composeIcon from "../assets/paper-airplane-svgrepo-com.svg";

function Sidebar() {
    const navigate = useNavigate();
    const pageLocation = useLocation();

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
                <div className="profile-picture">A</div>
                <div className="profile-name">Ansh</div>
                <div className="profile-email">ansh@gmail.com</div>
                <div className="logout-button">
                    <button>Sign Out</button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
