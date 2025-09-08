import React from "react"; 
import "../css/sidebar.css";
import emailIcon from "../assets/email.svg";
import dashboardIcon from "../assets/bar-graph-statistics-svgrepo-com.svg";
import emailOpenIcon from "../assets/email-1-svgrepo-com.svg";
import composeIcon from "../assets/paper-airplane-svgrepo-com.svg";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={emailIcon} alt="logo" />
                <h2>EchoMailer</h2>
            </div>

            <div className="nav-section">
                <div className="dashboard">
                    <img src={dashboardIcon} alt="dashboard" />
                    Dashboard
                </div>
                <div className="email">
                    <img src={emailOpenIcon} alt="email" />
                    Email
                </div>
                <div className="compose">
                    <img src={composeIcon} alt="compose" />
                    Compose
                </div>
            </div>
            
            <hr/>

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